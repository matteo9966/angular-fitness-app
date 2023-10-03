import { Routes } from '@angular/router';
import { HomeService } from './features/home/services/home.service';
import { SignupFormService } from './features/signup/services/signup-form.service';
import { LoginFormService } from './features/login/services/loginForm.service';
import { SignupService } from './features/signup/services/signup.service';
import { AuthenticationService } from './core/services/Authentication.service';

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
    providers: [SignupFormService, SignupService, AuthenticationService],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/pages/login/login.component').then(
        (c) => c.LoginComponent
      ),
    providers: [LoginFormService, AuthenticationService],
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/pages/dashboard/dashboard.component').then(
        (d) => d.DashboardComponent
      ),
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then((r) => r.routes),
    providers: [AuthenticationService],
  },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
];
