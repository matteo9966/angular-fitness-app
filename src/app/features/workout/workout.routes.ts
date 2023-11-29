import { Routes } from '@angular/router';
import { ROUTES } from '../../core/shared/app-routes';
import { WorkoutComponent } from './pages/workout/workout.component';
import { NotFoundComponent } from 'src/app/shared/pages/not-found/not-found.component';
export const routes: Routes = [
  {
    path: ROUTES.apps.children.workout.children.viewWorkout.path,
    loadComponent: () =>
      import('./pages/view-workout/view-workout.component').then(
        (w) => w.ViewWorkoutComponent
      ),
  },
  {
    path: ROUTES.apps.children.workout.children.editWorkout.path,
    loadComponent: () =>
      import('./pages/edit-workout/edit-workout.component').then(
        (c) => c.EditWorkoutComponent
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent,
  },
];
