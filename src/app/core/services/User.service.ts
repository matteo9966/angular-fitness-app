import { Injectable, inject } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Auth, User, authState } from '@angular/fire/auth';
import { Subscription, BehaviorSubject, Subject } from 'rxjs';
import { IUser } from '../models/User/IUser.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  firestore = inject(Firestore);
  auth = inject(Auth);
  authState$ = authState(this.auth);
  userId: string | null = null;
  user$: Subject<IUser> = new Subject();
  authStateSubscription!: Subscription;
  isAuthenticated$ = new BehaviorSubject(false);
  constructor() {
    this.authStateSubscription = this.authState$.subscribe(
      (aUser: User | null) => {
        if (aUser) {
          console.log({aUser})
          this.isAuthenticated$.next(true);
          this.userId = aUser.uid;
        } else {
          this.isAuthenticated$.next(false);
          this.userId = null;
        }
      }
    );
  }

  ngOnDestroy() {
    this.authStateSubscription && this.authStateSubscription.unsubscribe();
  }

  async getUser(userId:string) {
    if (!this.userId) {
      return null;
    }
    const docRef = doc(this.firestore, 'users', this.userId);
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

  get isAuthenticated(){
    return this.isAuthenticated$.value;
  }
}
