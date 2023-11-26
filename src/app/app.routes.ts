import { Routes } from '@angular/router';
import { HomeService } from './features/home/services/home.service';
import { SignupFormService } from './features/signup/services/signup-form.service';
import { LoginFormService } from './features/login/services/loginForm.service';
import { SignupService } from './features/signup/services/signup.service';
import { canActivateDashboardGuard } from './features/dashboard/guards/can-activate-dashboard.guard';
import { ToolbarService } from './features/home/services/toolbar.service';
import { DashboardPageService } from './features/dashboard/services/Dashboard-page.service';
import { isUnAuthenticatedGuard } from './core/guards/is-UnAuthenticated.guard';
import { ROUTES } from './core/shared/app-routes';
import { getUserDataResolver } from './features/dashboard/resolvers/resolveUserData.resolver';
import { WorkoutService } from './features/workout/services/workout.service';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
export const routes: Routes = [
  {
    path: ROUTES.home.path,
    loadComponent: () =>
      import('./features/home/pages/home/home.component').then(
        (c) => c.HomeComponent
      ),
    //activate only if not authorized else go to dashboard!
    canActivate: [isUnAuthenticatedGuard],
    loadChildren: () =>
      import('./features/home/home.routes').then((r) => r.homeRoutes),
    providers: [HomeService, ToolbarService],
  },
  {
    path: ROUTES.signup.path,
    loadComponent: () =>
      import('./features/signup/pages/signup/signup.component').then(
        (c) => c.SignupComponent
      ),
    canActivate: [isUnAuthenticatedGuard],
    providers: [SignupFormService, SignupService],
  },
  {
    path: ROUTES.login.path,
    loadComponent: () =>
      import('./features/login/pages/login/login.component').then(
        (c) => c.LoginComponent
      ),
    canActivate: [isUnAuthenticatedGuard],
    providers: [LoginFormService],
  },
  {
    // DASHBOARD
    path: ROUTES.dashboard.path,
    loadComponent: () =>
      import('./features/dashboard/pages/dashboard/dashboard.component').then(
        (d) => d.DashboardComponent
      ),
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then((r) => r.routes),
    providers: [DashboardPageService],
    canActivate: [canActivateDashboardGuard],
    resolve: { user: getUserDataResolver },
  },
  {
    // APPS
    path: ROUTES.apps.path,
    loadComponent: () =>
      import('./features/apps/apps.component').then((c) => c.AppsComponent),
    loadChildren: () =>
      import('./features/apps/apps.routes').then((r) => r.routes),
    canActivate: [],
    providers: [WorkoutService],
  },
  {
    path: ROUTES.unauthorized.path,
    loadComponent: () =>
      import('./shared/pages/unauthorized/unauthorized.component').then(
        (d) => d.UnauthorizedComponent
      ),
  },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: '**', component: NotFoundComponent },
];
