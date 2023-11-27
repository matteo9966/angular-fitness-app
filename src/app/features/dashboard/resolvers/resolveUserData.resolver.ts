import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { inject } from '@angular/core';
import { IUser } from 'src/app/core/models/User/IUser.interface';
// import { SnackbarService } from 'src/app/core/services/Snackbar.service';
import { UserService } from '../services/User.service';
import { AuthenticationService } from 'src/app/core/services/Authentication.service';
import { STORAGE_TOKEN } from 'src/app/core/tokens/Storage.injectionToken';
export const getUserDataResolver: ResolveFn<Promise<IUser | null>> = async (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) => {
  const userService = inject(UserService);
  const storage = inject(STORAGE_TOKEN);
  const userId = storage.getItem('userId');
  if (userId) {
    const user = await userService.getUser(userId);
    userService.setUserData(user as IUser);
    return user;
  } else {
    return null;
  }
};
