import {
  Injectable,
  OnDestroy,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from '@angular/fire/auth';
import { IUserSignup } from '../models/User/IUser.signup';
import {
  catchError,
  concatMap,
  from,
  map,
  throwError,
  Observable,
  shareReplay,
} from 'rxjs';
import { IUser } from '../models/User/IUser.interface';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CustomServerError } from '../errors/CustomServerError';

@Injectable()
export class AuthenticationService implements OnDestroy {
  auth = inject(Auth);
  firestore = inject(Firestore);
  router = inject(Router);
  userId = null;
  user!: FirebaseUser;
  isLoading = signal(false);

  #authState = signal<FirebaseUser | null>(null);
  authState = computed(() => this.#authState());

  private _authState$ = new Observable<FirebaseUser | null>((observer) => {});
  authState$ = this._authState$.pipe(shareReplay(1));

  constructor() {
    this.isLoading.set(true);
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.#authState.set(user);
      } else {
        this.#authState.set(null);
      }
    });

    effect(() => {
      const user = this.#authState();
      if (user) sessionStorage.setItem('userId', user.uid);
      else sessionStorage.removeItem('userId');
    });
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  signupUser(user: IUserSignup) {
    const email = user.email;
    const password = user.password;
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      concatMap((result) => {
        if (!result.user) {
          throwError(() => new Error('no user'));
        }
        const uid = result.user.uid;
        const newUser: IUser = {
          bio: '',
          birthdate: '',
          email: email,
          gender: 'M',
          id: uid,
          name: user.name,
          profileImg: '',
          status: '',
          backgroundImg: '',
          socials: [],
          bodyStats: {
            height: 0,
            weight: 0,
          },
        };
        const userDocRef = doc(this.firestore, 'users', uid);
        return from(setDoc(userDocRef, newUser)).pipe(map(() => userDocRef));
      }),
      catchError((error) => {
        if (error?.code) {
          return throwError(
            () =>
              new CustomServerError(
                error?.message || 'Server error',
                error.code
              )
          );
        }
        return throwError(() => new Error(error));
      })
    );
  }

  signIn(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signout() {
    return from(signOut(this.auth));
  }

  get currentUser() {
    return this.auth.currentUser;
  }

  get isLoggedIn() {
    return sessionStorage.getItem('loggedIn');
  }
}
