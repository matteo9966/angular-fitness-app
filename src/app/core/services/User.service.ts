import { Injectable, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Auth, User, authState } from '@angular/fire/auth';
import { Subscription, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  firestore = inject(Firestore);
  auth = inject(Auth);
  authState$ = authState(this.auth);
  authStateSubscription!: Subscription;
  isAuthenticated$ = new BehaviorSubject(false);
  constructor() {
    this.authStateSubscription = this.authState$.subscribe(
      (aUser: User | null) => {
        if (aUser) {
          this.isAuthenticated$.next(true);
        } else {
          this.isAuthenticated$.next(false);
        }
      }
    );
  }

  ngOnDestroy() {
    this.authStateSubscription && this.authStateSubscription.unsubscribe();
  }
}
