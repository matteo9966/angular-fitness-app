import { Injectable, inject } from '@angular/core';
import {
  Observable,
  catchError,
  concatMap,
  defer,
  from,
  throwError,
} from 'rxjs';
import { mockUser } from 'src/app/core/mocks/userMocks';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  setDoc,
  doc,
} from '@angular/fire/firestore';
import {
  getAuth,
  Auth,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import { IUser } from 'src/app/core/models/User/IUser.interface';
import { IUserSignup } from 'src/app/core/models/User/IUser.signup';
@Injectable()
export class UserService {
  firestore = inject(Firestore);
  auth = inject(Auth);
  usersCollection = collection(this.firestore, 'users');
  private deferedAddDoc = <T>(...arg: Parameters<typeof addDoc>) => {
    return defer(() => from(addDoc(...arg))) as Observable<T>;
  };

  addUser(user: IUser) {
    return from(addDoc(this.usersCollection, user));
  }




}
