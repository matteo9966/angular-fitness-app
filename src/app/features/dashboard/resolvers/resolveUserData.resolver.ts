// import {
//   ActivatedRouteSnapshot,
//   ResolveFn,
//   RouterStateSnapshot,
//   Router,
// } from '@angular/router';
// import { inject } from '@angular/core';
// import { UserService } from 'src/app/core/services/User.service';
// import { EMPTY } from 'rxjs';
// import { IUser } from 'src/app/core/models/User/IUser.interface';
// import { SnackbarService } from 'src/app/core/services/Snackbar.service';
// export const getUserDataResolver: ResolveFn<IUser> = async (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ) => {
//   const userService = inject(UserService);
//   const snackbarService = inject(SnackbarService);
// //   const router = inject(Router);

//   const user = await userService.user$.val
//   if (!user) {
//     snackbarService.errorSnackbar('Error while fetching user data','Close');
//     throw new Error('no user!');
//   }
//   return user;
// };
