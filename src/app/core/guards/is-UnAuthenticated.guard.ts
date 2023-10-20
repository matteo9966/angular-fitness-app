import { CanActivateFn,Router } from '@angular/router';
import {inject} from '@angular/core';
import { AuthenticationService } from '../services/Authentication.service';

export const isUnAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService)
  const router = inject(Router)
  if(authService.isLoggedIn){
    return router.createUrlTree(['/dashboard']);
  }else{
    return true
  }
};
