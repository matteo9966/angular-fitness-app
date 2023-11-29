import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonToggleComponent } from 'src/app/shared/components/button-toggle/button-toggle.component';
import { WorkoutsTableComponent } from '../../components/workouts-table/workouts-table.component';
import { WorkoutPanelComponent } from '../../components/workout-panel/workout-panel.component';
import { WeekWorkoutTableComponent } from '../../components/week-workout-table/week-workout-table.component';
@Component({
  selector: 'app-view-workout',
  standalone: true,
  imports: [
    CommonModule,
    ButtonToggleComponent,
    WorkoutsTableComponent,
    WorkoutPanelComponent,
    WeekWorkoutTableComponent,
  ],
  templateUrl: './view-workout.component.html',
  styleUrl: './view-workout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewWorkoutComponent {}
