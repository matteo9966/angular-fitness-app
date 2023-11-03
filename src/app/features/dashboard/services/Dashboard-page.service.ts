import { Injectable, inject, computed } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/Authentication.service';
import { timeout, EMPTY, delay, tap } from 'rxjs';
import { DialogService } from 'src/app/core/services/Dialog.service';
import { Router } from '@angular/router';
import { UserService } from './User.service';

@Injectable()
export class DashboardPageService {
  DEFAULT_BACKGROUND_IMAGE =
    'https://images.unsplash.com/photo-1682686581362-796145f0e123?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
  authenticationService = inject(AuthenticationService);
  dialogService = inject(DialogService);
  router = inject(Router);
  userService = inject(UserService);

  profileBackgroundPicture = computed(
    () => this.userService.user()?.backgroundImg || this.DEFAULT_BACKGROUND_IMAGE
  );

  logout() {
    // show spinner
    this.dialogService.showSpinner();
    setTimeout(() => {
      this.dialogService.hideDialog();
    }, 2400);
    this.authenticationService
      .signout()
      .pipe(
        delay(1000),
        timeout({ first: 2000, with: () => EMPTY }),
        tap({
          complete: () => {
            this.dialogService.hideDialog();
            this.router.navigateByUrl('/home');
          },
          error: () => {
            this.dialogService.hideDialog();
          },
        })
      )
      .subscribe();
  }
}
