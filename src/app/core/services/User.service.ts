import { Injectable, inject } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Auth, User, authState, onAuthStateChanged } from '@angular/fire/auth';
import { Subscription, BehaviorSubject, Subject } from 'rxjs';
import { IUser } from '../models/User/IUser.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  firestore = inject(Firestore);
  auth = inject(Auth);
  userId: string | null = null;
  isAuthenticated$ = new BehaviorSubject(false);
  constructor() {
  }



  async getUser(userId: string) {
    if (!userId) {
      return null;
    }
    const docRef = doc(this.firestore, 'users', userId);
    try {
      const document = await getDoc(docRef);
      if (document.exists()) {
        return document.data() as IUser;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  get isAuthenticated() {
    return this.isAuthenticated$.value;
  }
}
