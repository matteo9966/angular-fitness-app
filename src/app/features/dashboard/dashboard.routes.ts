import { Routes } from '@angular/router';
// import { getUserDataResolver } from './resolvers/resolveUserData.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/profile/profile.component').then(
        (d) => d.ProfileComponent
      ),
    // resolve: { user: getUserDataResolver },
  },
];
