import {Injectable,inject} from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/Authentication.service';
import { timeout, EMPTY, delay, tap } from 'rxjs';
import { DialogService } from 'src/app/core/services/Dialog.service';
import { Router } from '@angular/router';

@Injectable()
export class DashboardPageService{
    authenticationService = inject(AuthenticationService);
    dialogService = inject(DialogService);
    router = inject(Router)
    logout() {
        // show spinner
        this.dialogService.showSpinner();
        setTimeout(()=>{this.dialogService.hideDialog()},2400);
        this.authenticationService
          .signout()
          .pipe(
            delay(1000),
            timeout({ first: 2000, with: () => EMPTY }),
            tap({
              complete: () => {
                this.dialogService.hideDialog();
                this.router.navigateByUrl('/home')
              },
              error: () => {
                this.dialogService.hideDialog();
              },
            })
          )
          .subscribe();
      }
    
}