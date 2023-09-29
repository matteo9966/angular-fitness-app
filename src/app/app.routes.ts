import { Routes } from '@angular/router';
import { HomeService } from './features/home/services/home.service';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/pages/home/home.component').then(
        (c) => c.HomeComponent
      ),
    loadChildren: () =>
      import('./features/home/home.routes').then((r) => r.homeRoutes),
    providers: [HomeService],
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./features/signup/pages/signup/signup.component').then(
        (c) => c.SignupComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/pages/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
];
