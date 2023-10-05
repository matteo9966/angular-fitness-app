import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/User.service';

export const canActivateDashboardGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  if (userService.isAuthenticated) {
    return true;
  } else {
    return router.createUrlTree(['/unauthorized']);
  }
};
