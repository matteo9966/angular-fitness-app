import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/pages/home/home.component').then(
        (c) => c.HomeComponent
      ),
    loadChildren: () =>
      import('./features/home/home.routes').then((r) => r.homeRoutes),
  },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
];
