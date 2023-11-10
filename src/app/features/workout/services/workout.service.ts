import { Injectable, signal } from '@angular/core';
import { workout } from 'src/app/core/mocks/WorkoutMocks';
import { Workout } from 'src/app/core/models/Workout/IWorkout.interface';
import { toObservable } from '@angular/core/rxjs-interop';
import { switchMap, tap, of, distinctUntilChanged } from 'rxjs';

async function mockFirebaseGetWorkout() {
  return workout;
}

// const updateFactory =
//   (workout: Workout) => (workouts: Record<number, Workout[]>) => {
//     const woYear = workout.year;
//     const month = workout.month;
//     const storedYearWorkouts = workouts[woYear];

//     if(storedYearWorkouts){
//       const hasMonth
//     }
//     return workouts;
//   };
@Injectable()
export class WorkoutService {
  //store the workouts in year :workout format
  workouts = signal<Record<number, Workout[]>>({
    2023: [workout],
  });
  constructor() {}

  /**
   * @param {number} year
   * @param {number} month
   * @description pass year and month check store, if present get it from store else call db and update store
   */
  getWorkout(year: number, month: number) {
    const searchYear = this.workouts()[year];
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
      distinctUntilChanged(),
      // tap((workout) => {
      //   if (workout && workout?.year) {
      //     this.workouts.update((wos) => {});
      //   }
      // })
    );
  }
}
