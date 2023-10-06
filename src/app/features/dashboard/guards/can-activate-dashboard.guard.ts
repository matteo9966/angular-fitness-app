import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/Authentication.service';
import { UserService } from 'src/app/core/services/User.service';

export const canActivateDashboardGuard: CanActivateFn = (route, state) => {
 
  // const authService = inject(AuthenticationService);
  // const router = inject(Router);

  // const isLoggedIn = authService.isLoggedIn;
  // if(!isLoggedIn){
  //   return router.createUrlTree(['/unauthorized'])
  // }
  return true
};
