import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { switchMap, tap, Observable, take } from 'rxjs';
import { inject } from '@angular/core';
import { IUser } from 'src/app/core/models/User/IUser.interface';
// import { SnackbarService } from 'src/app/core/services/Snackbar.service';
import { UserService } from '../services/User.service';
import { AuthenticationService } from 'src/app/core/services/Authentication.service';
export const getUserDataResolver: ResolveFn<Observable<IUser | null>> = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) => {
  const authService = inject(AuthenticationService);
  const userService = inject(UserService);

  const data$ = authService.authState$.pipe(
    take(1),
    switchMap(async (firebaseuser) => {
      if (!firebaseuser) {
        return null;
      } else {
        const user = await userService.getUser(firebaseuser.uid);
        return user;
      }
    }),
    tap((data) => {
      if (!data) {
        return;
      }
      userService.setUserData(data as IUser);
    })
  );
  return data$;
};
