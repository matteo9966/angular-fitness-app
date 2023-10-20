import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/Authentication.service';
import { map } from 'rxjs';
import { ROUTES } from 'src/app/core/shared/app-routes';
export const canActivateDashboardGuard: CanActivateFn = (route, state) => {
  console.log('executing can activate dashboard');
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.authState$.pipe(
    map((user) => {
      if (user) {
        return true;
      }
      return router.createUrlTree([ROUTES.unauthorized.absolute]);
    })
  );
};
