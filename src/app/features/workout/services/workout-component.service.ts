import { Injectable, inject, signal, computed } from '@angular/core';
import { WorkoutService } from './workout.service';
import { Exercise } from 'src/app/core/models/Workout/IWorkout.interface';
import { updateExercise } from '../store/actions/workoutActions';
@Injectable()
export class WorkoutComponentService {
  workoutService = inject(WorkoutService);

  workouts = this.workoutService.workouts;

  selectedWeekNumber = signal<number | null>(null);
  selectedDayNumber = signal<number | null>(null);

  currentMonthWorkout = computed(() => {
    const workouts = this.workouts();
    const thisYear = workouts?.[2023];
    const thisMonthNumber = 11;
    const currentMonth = thisYear?.find((wo) => wo.month === thisMonthNumber);
    return currentMonth;
  });

  days  = computed(()=>{
    return this.currentMonthWorkout()?.workout || []
  })

  // ok now i can map this in a simplified table



  updateSelectedWeekNumber(weekNumber: number) {
    this.selectedWeekNumber.set(weekNumber);
  }

  updateSelectedDayNumber(dayNumber: number) {
    this.selectedDayNumber.set(dayNumber);
  }

  updateExercise(exercise: Exercise) {
    const selectedDayNumber = this.selectedDayNumber();
    const selectedWeekNumber = this.selectedWeekNumber();
    const selectedMonthNumber = this.currentMonthWorkout()?.month;
    const selectedYearNumber = this.currentMonthWorkout()?.year;
    console.log({
      selectedDayNumber,
      selectedMonthNumber,
      selectedYearNumber,
      selectedWeekNumber,
    });

    if (
      !selectedDayNumber ||
      !selectedWeekNumber ||
      !selectedMonthNumber ||
      !selectedYearNumber
    ) {
      return;
    }
    this.workoutService.dispatch(
      updateExercise({
        year: selectedYearNumber,
        dayNumber: selectedDayNumber,
        month: selectedMonthNumber,
        weekNumber: selectedWeekNumber,
        exercise,
      })
    );
    // this.workoutService.updateExercise(exercise)
  }

  constructor() {
    this.updateSelectedDayNumber = this.updateSelectedDayNumber.bind(this);
    this.updateSelectedWeekNumber = this.updateSelectedWeekNumber.bind(this);
  }
}
