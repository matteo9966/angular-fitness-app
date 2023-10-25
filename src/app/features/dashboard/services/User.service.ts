import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { IUser } from 'src/app/core/models/User/IUser.interface';
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

  setUserData(data: IUser) {
    this.user$.next(data);
  }

  patchUserData(patch: (data: IUser | null) => IUser) {
    const updated = patch(this.user$?.value);
    this.user$.next(updated);
  }

  udateUserDocument(partialUser: Partial<IUser>) {
    return new Observable((observer) => {
      const userDoc = this.userDoc;
      if (!userDoc) {
        observer.error('missing userId');
        return;
      }
      updateDoc(userDoc, partialUser)
        .then((userData) => {
          observer.next(userData);
          observer.complete();
        })
        .catch((err) => {
          observer.error(err);
        });
    });
  }

  get userDoc() {
    if (!this.user$.value?.id) return null;
    return doc(this.firestore, 'users', this.user$.value?.id);
  }
}
