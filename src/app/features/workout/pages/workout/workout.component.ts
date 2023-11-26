import {
  ChangeDetectionStrategy,
  Component,
  inject,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetContainerComponent } from 'src/app/shared/components/widget-container/widget-container.component';
import { WorkoutsTableComponent } from '../../components/workouts-table/workouts-table.component';
import { WeekWorkoutTableComponent } from '../../components/week-workout-table/week-workout-table.component';
import { ButtonToggleComponent } from 'src/app/shared/components/button-toggle/button-toggle.component';
import { WorkoutComponentService } from '../../services/workout-component.service';
import { filter, map } from 'rxjs';
import { WorkoutPanelComponent } from '../../components/workout-panel/workout-panel.component';
import { Exercise } from 'src/app/core/models/Workout/IWorkout.interface';
import { FullMonthTableComponent } from '../../components/full-month-table/full-month-table.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [
    CommonModule,
    WidgetContainerComponent,
    WorkoutsTableComponent,
    WeekWorkoutTableComponent,
    ButtonToggleComponent,
    WorkoutPanelComponent,
    FullMonthTableComponent,
    RouterOutlet
  ],
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutComponent {

  constructor(){
    // this.workoutComponentService.workoutService.getMonthWorkout();
  }
   
  workoutComponentService = inject(WorkoutComponentService);
  days = this.workoutComponentService.days; // this is the table data

}
