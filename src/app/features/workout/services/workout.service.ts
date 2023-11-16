import { Injectable, inject, signal, computed, Signal } from '@angular/core';
import { workout } from 'src/app/core/mocks/WorkoutMocks';
import { Workout } from 'src/app/core/models/Workout/IWorkout.interface';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  switchMap,
  tap,
  of,
  distinctUntilChanged,
  map,
  catchError,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';

async function mockFirebaseGetWorkout() {
  return workout;
}

@Injectable()
export class WorkoutService {
  httpClient = inject(HttpClient);
  GET_WORKOUT_API = '/assets/mocks/current-month-workout.json';

  currentMonthWorkout$ = this.httpClient
    .get<Workout>(this.GET_WORKOUT_API)
    .pipe(
      map((workout) => {
        const initial: Record<number, Workout[]> = {
          [+workout.year]: [workout],
        };
        return initial;
      }),
      catchError((_error) => {
        console.log(_error)
        return of({});
      })
    );

  // workouts = signal<Record<number, Workout[]>>({
  //   2023: [workout],
  // });

  #workouts: Signal<Record<number, Workout[]>> = toSignal(
    this.currentMonthWorkout$,
    { initialValue: {} as Record<number, Workout[]> }
  );

  public workouts = computed(this.#workouts);

  constructor() {}

  /**
   * @param {number} year
   * @param {number} month
   * @description pass year and month check store, if present get it from store else call db and update store
   */
  getWorkout(year: number, month: number) {
    const searchYear = this.workouts()?.[year];
    if (!searchYear) {
    }

    return toObservable(this.workouts).pipe(
      switchMap((workouts) => {
        const yearWO = workouts[year];
        const monthWOIndex = yearWO?.findIndex((wo) => wo?.month === month);
        //check for year and month
        if (yearWO && monthWOIndex > 0) {
          return of(yearWO[monthWOIndex]);
        } else {
          return mockFirebaseGetWorkout();
        }
      }),
      distinctUntilChanged()
    );
  }

  selectWorkout(year:number,month:number){
   const workouts = this.workouts()
  }



}
