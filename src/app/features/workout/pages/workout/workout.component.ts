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

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [
    CommonModule,
    WidgetContainerComponent,
    WorkoutsTableComponent,
    WeekWorkoutTableComponent,
    ButtonToggleComponent,
  ],
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutComponent {
  workoutComponentService = inject(WorkoutComponentService);

  // avalableWeekNumbers$ =
  //   this.workoutComponentService.availableWeeksNumbers$.pipe(
  //     map((weeks) => {
  //       return weeks.map((n) => ({
  //         label: `Week ${n}`,
  //         value: n,
  //       }));
  //     }),
  //     filter(Boolean)
  //   );

  avalableWeekNumbers = computed(() =>
    this.workoutComponentService.availableWeeksNumbers().map((n) => ({
      label: `Week ${n}`,
      value: n,
    }))
  );

  // availableDayNumbers$ =
  //   this.workoutComponentService.availableDayNumbersSelectedWeek$.pipe(
  //     map((days) => {
  //       return days.map((n) => ({
  //         label: `Day ${n}`,
  //         value: n,
  //       }));
  //     }),
  //     filter(Boolean)
  //   );

  dayTableData = this.workoutComponentService.selectedDayTableDataSource;

  availableDayNumbers = computed(() =>
    this.workoutComponentService.availableDayNumbersSelectedWeek().map((n) => ({
      label: `Day ${n}`,
      value: n,
    }))
  );

  selectWeek = this.workoutComponentService.updateSelectedWeekNumber;
  selectDay = this.workoutComponentService.updateSelectedDayNumber;
}
