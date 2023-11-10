import { Routes } from '@angular/router';
import { ROUTES } from 'src/app/core/shared/app-routes';
import { WorkoutComponentService } from '../workout/services/workout-component.service';

export const routes: Routes = [
  {
    path: ROUTES.apps.children.workout.path,
    providers: [WorkoutComponentService],
    loadComponent: () =>
      import('../workout/pages/workout/workout.component').then(
        (c) => c.WorkoutComponent
      ),
  },
  {
    path: '',
    redirectTo: ROUTES.apps.children.workout.path,
    pathMatch: 'full',
  },
];
