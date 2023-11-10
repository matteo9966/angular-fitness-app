import { Injectable, inject } from '@angular/core';
import { WorkoutService } from './workout.service';
import { map, Subject, combineLatest, shareReplay, tap } from 'rxjs';
@Injectable()
export class WorkoutComponentService {
  workoutService = inject(WorkoutService);
  selectedWeekNumber$ = new Subject<number>();
  selectedDayNumber$ = new Subject<number>();
  currentMonthWorkout$ = this.workoutService
    .getWorkout(2023, 10)
    .pipe(shareReplay(1));
  availableWeeks$ = this.currentMonthWorkout$.pipe(map((wo) => wo.weeks));
  availableWeeksNumbers$ = this.currentMonthWorkout$.pipe(
    map((wo) => wo.weeks.map((w) => w.weekNumber).sort((a, b) => a - b))
  );

  selectedWeek$ = combineLatest([
    this.availableWeeks$,
    this.selectedWeekNumber$,
  ]).pipe(
    map(([weeks, weekNumber]) => {
      return weeks.find((w) => w.weekNumber === weekNumber);
    })
  );

  availableDaysSelectedWeek$ = this.selectedWeek$.pipe(
    map((w) => w?.days || [])
  );
  availableDayNumbersSelectedWeek$ = this.availableDaysSelectedWeek$.pipe(
    map((d) => d.map((day) => day.dayNumber).sort((a, b) => a - b))
  );

  selectedDay$ = combineLatest([
    this.selectedDayNumber$,
    this.availableDaysSelectedWeek$,
  ]).pipe(
    tap(d=>console.log(d)),
    map(([dayNumber, days]) => {
      return days.find((d) => d.dayNumber === dayNumber);
    })
  );

  selectedDayTableDataSource$ = this.selectedDay$.pipe(
    map((d) => d?.exercises || [])
  );

  selectWeek(weekNumber: number) {
    this.selectedWeekNumber$.next(weekNumber);
  }

  selectDay(dayNumber: number) {
    this.selectedDayNumber$.next(dayNumber);
  }

  constructor() {
    this.selectWeek = this.selectWeek.bind(this);
    this.selectDay = this.selectDay.bind(this);
  }
}
