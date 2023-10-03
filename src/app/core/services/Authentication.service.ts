import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  authState,
  signOut,
} from '@angular/fire/auth';
import { IUserSignup } from '../models/User/IUser.signup';
import { catchError, concatMap, from, map, throwError } from 'rxjs';
import { IUser } from '../models/User/IUser.interface';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable()
export class AuthenticationService {
  auth = inject(Auth);
  authenticationState = authState(this.auth);
  firestore = inject(Firestore);

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
          height: 177,
          id: uid,
          name: user.name,
          profileImg: '',
          status: '',
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

  signOut() {
    return from(signOut(this.auth));
  }
}
