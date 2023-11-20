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

  availableWeeks = computed(() => {
    return this.currentMonthWorkout()?.weeks || [];
  });

  availableWeeksNumbers = computed(() => {
    return this.availableWeeks()
      .map((w) => w.weekNumber)
      .sort((a, b) => a - b);
  });

  selectedWeek = computed(() => {
    return this.availableWeeks().find(
      (w) => w.weekNumber == this.selectedWeekNumber()
    );
  });

  availableDaysSelectedWeek = computed(() => {
    return this.selectedWeek()?.days || [];
  });

  availableDayNumbersSelectedWeek = computed(() => {
    return this.availableDaysSelectedWeek()
      .map((w) => w.dayNumber)
      .sort((a, b) => a - b);
  });

  selectedDay = computed(() => {
    return this.availableDaysSelectedWeek().find(
      (d) => d.dayNumber === this.selectedDayNumber()
    );
  });

  selectedDayTableDataSource = computed(() => {
    const selecteDay = this.selectedDay();
    return selecteDay?.exercises || [];
  });

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
