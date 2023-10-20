import { Injectable, inject } from '@angular/core';
import {
  Observable,
  catchError,
  concatMap,
  defer,
  from,
  throwError,
  BehaviorSubject,
} from 'rxjs';
import { mockUser } from 'src/app/core/mocks/userMocks';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  setDoc,
  doc,
  getDoc,
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
  userCollection = collection(this.firestore, 'users');
  private user$ = new BehaviorSubject<IUser | null>(null);

  async getUser(id: string) {
    try {
      const user = await getDoc(doc(this.firestore, 'users', id));
      if (!user) {
        return null;
      }
      return user.data() as IUser;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  get userData$() {
    return this.user$.asObservable();
  }
  setUserData(data:IUser){
    this.user$.next(data);
  }
}
