import { Injectable, OnDestroy, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  authState,
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
  // BehaviorSubject,
  // Subject,
  Observable,
  shareReplay
} from 'rxjs';
import { IUser } from '../models/User/IUser.interface';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService implements OnDestroy {
  auth = inject(Auth);
  authenticationState = authState(this.auth);
  firestore = inject(Firestore);
  router = inject(Router);
  userId = null;
  user!:FirebaseUser;

  private _authState$ = new Observable<FirebaseUser|null>(observer=>{
    onAuthStateChanged(this.auth, async (user) => { 
      if (user) {
        observer.next(user);
      } else {
        observer.next(null);        
      }
    });
  })

  // private isAuthenticated$ = new BehaviorSubject(false);

  authState$ = this._authState$.pipe(shareReplay(1))

  constructor() {
    this.authState$.subscribe(user=>{
      if(user){
        sessionStorage.setItem('loggedIn','true')
        // this.isAuthenticated$.next(true)

      }else{
        sessionStorage.removeItem('loggedIn');
        // this.isAuthenticated$.next(false);
      }
    })

    // onAuthStateChanged(this.auth, async (user) => {
    //   console.log('executing onAuthStateChanged')
    //   if (user) {
    //     // todo fix the bug on the user!!
    //     this.user=user;
    //   } else {       
    //     sessionStorage.removeItem('loggedIn');
    //     // this.isAuthenticated$.next(false);
    //   }
    // });
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
          backgroundImg:'',
          socials:[],
          bodyStats:{
            height:0,
            weight:0,
          }
        };
        const userDocRef = doc(this.firestore, 'users', uid);
        return from(setDoc(userDocRef, newUser)).pipe(map(() => userDocRef));
      }),
      catchError((error) => {
        console.log(error);
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

  // get isAuthenticated() {
  //   return this.isAuthenticated$.value;
  // }

  get currentUser() {
    return this.auth.currentUser;
  }

  get isLoggedIn(){
    return sessionStorage.getItem('loggedIn');
  }


}
