import { Routes } from '@angular/router';
import { getUserDataResolver } from './resolvers/resolveUserData.resolver';
import { ROUTES } from '../../core/shared/app-routes';
import { EditUserFormService } from './services/edit-user-form.service';
export const routes: Routes = [
  {
    path: ROUTES.dashboard.children.editUser.path,
    loadComponent: () =>
      import('./pages/edit-user/edit-user.component').then(
        (d) => d.EditUserComponent
      ),
    providers:[EditUserFormService]
  },
  {
    path: ROUTES.dashboard.children.profile.path,
    loadComponent: () =>
      import('./pages/profile/profile.component').then(
        (d) => d.ProfileComponent
      ),
    // resolve: { user: getUserDataResolver },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ROUTES.dashboard.children.profile.absolute,
  },
];
