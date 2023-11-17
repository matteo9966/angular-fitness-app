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

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [
    CommonModule,
    WidgetContainerComponent,
    WorkoutsTableComponent,
    WeekWorkoutTableComponent,
    ButtonToggleComponent,
    WorkoutPanelComponent
  ],
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutComponent {
  workoutComponentService = inject(WorkoutComponentService);

  avalableWeekNumbers = computed(() =>
    this.workoutComponentService.availableWeeksNumbers().map((n) => ({
      label: `Week ${n}`,
      value: n,
    }))
  );

  dayExercises = this.workoutComponentService.selectedDayTableDataSource;

  availableDayNumbers = computed(() =>
    this.workoutComponentService.availableDayNumbersSelectedWeek().map((n) => ({
      label: `Day ${n}`,
      value: n,
    }))
  );

  exerciseUpdated(exercise:Exercise){
    console.log(exercise)
    this.workoutComponentService.updateExercise(exercise)
  }

  selectWeek = this.workoutComponentService.updateSelectedWeekNumber;
  selectDay = this.workoutComponentService.updateSelectedDayNumber;
}
