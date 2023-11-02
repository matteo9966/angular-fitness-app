import { Injectable, inject, signal } from '@angular/core';
import {  Observable } from 'rxjs';
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

  user = signal<IUser | null>(null);

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

  

  setUserData(data: IUser) {

    this.user.set(data);
  }

  patchUserData(patch: (data: IUser | null) => IUser) {
    this.user.update((user) => patch(user));
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
    if (!this.user()?.id) return null;
    return doc(this.firestore, 'users', this.user()!.id);
  }
}
