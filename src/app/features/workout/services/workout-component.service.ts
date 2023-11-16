import { Injectable, inject, signal, computed } from '@angular/core';
import { WorkoutService } from './workout.service';
import { map, Subject, combineLatest, shareReplay, tap } from 'rxjs';
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
    const currentMonth = thisYear.find((wo) => wo.month === thisMonthNumber);
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

  // selectedWeekNumber$ = new Subject<number>();
  // selectedDayNumber$ = new Subject<number>();
  // currentMonthWorkout$ = this.workoutService
  //   .getWorkout(2023, 10)
  //   .pipe(shareReplay(1));
  // availableWeeks$ = this.currentMonthWorkout$.pipe(map((wo) => wo.weeks));
  // availableWeeksNumbers$ = this.currentMonthWorkout$.pipe(
  //   map((wo) => wo.weeks.map((w) => w.weekNumber).sort((a, b) => a - b))
  // );

  // selectedWeek$ = combineLatest([
  //   this.availableWeeks$,
  //   this.selectedWeekNumber$,
  // ]).pipe(
  //   map(([weeks, weekNumber]) => {
  //     return weeks.find((w) => w.weekNumber === weekNumber);
  //   })
  // );

  // availableDaysSelectedWeek$ = this.selectedWeek$.pipe(
  //   map((w) => w?.days || [])
  // );
  // availableDayNumbersSelectedWeek$ = this.availableDaysSelectedWeek$.pipe(
  //   map((d) => d.map((day) => day.dayNumber).sort((a, b) => a - b))
  // );

  // selectedDay$ = combineLatest([
  //   this.selectedDayNumber$,
  //   this.availableDaysSelectedWeek$,
  // ]).pipe(
  //   map(([dayNumber, days]) => {
  //     return days.find((d) => d.dayNumber === dayNumber);
  //   })
  // );

  // selectedDayTableDataSource$ = this.selectedDay$.pipe(
  //   map((d) => d?.exercises || [])
  // );

  // selectWeek(weekNumber: number) {
  //   this.selectedWeekNumber$.next(weekNumber);
  // }

  // selectDay(dayNumber: number) {
  //   this.selectedDayNumber$.next(dayNumber);
  // }

  constructor() {
    // this.selectWeek = this.selectWeek.bind(this);
    // this.selectDay = this.selectDay.bind(this);

    this.updateSelectedDayNumber = this.updateSelectedDayNumber.bind(this);
    this.updateSelectedWeekNumber = this.updateSelectedWeekNumber.bind(this);
  }
}
