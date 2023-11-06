import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetContainerComponent } from 'src/app/shared/components/widget-container/widget-container.component';
import { WorkoutsTableComponent } from '../../components/workouts-table/workouts-table.component';
import { WeekWorkoutTableComponent } from '../../components/week-workout-table/week-workout-table.component';

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [
    CommonModule,
    WidgetContainerComponent,
    WorkoutsTableComponent,
    WeekWorkoutTableComponent,
  ],
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutComponent {}
