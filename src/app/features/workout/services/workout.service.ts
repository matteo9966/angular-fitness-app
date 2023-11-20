import {
  Injectable,
  inject,
  signal,
  computed,
} from '@angular/core';
import {
  Exercise,
  Workout,
} from 'src/app/core/models/Workout/IWorkout.interface';
import { toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { of, map, catchError, Subject, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import type { Action } from '../store/actions/Action.type';
import { updateExercise,deleteExercise } from '../store/actions/workoutActions';

type State = Record<number, Workout[]>;

@Injectable()
export class WorkoutService {
  httpClient = inject(HttpClient);
  GET_WORKOUT_API = '/assets/mocks/current-month-workout.json';

  // exerciseAction$ = new Subject<Action<Exercise>>();

  action$ = new Subject<Action>();

  currentMonthWorkout$ = this.httpClient
    .get<Workout>(this.GET_WORKOUT_API)
    .pipe(
      map((workout) => {
        const initial: State = {
          [+workout.year]: [workout],
        };
        return initial;
      }),
      catchError((_error) => {
        console.log(_error);
        return of({});
      })
    );

  #workouts = signal<Record<number, Workout[]>>({}); //this will be the STATE

  public workouts = computed(this.#workouts);

  exerciseReducer(state: State, action: Action): State {
    switch (action.type) {
      case updateExercise.type:
        {
          const freshState = {...state};
          const payload = action.payload ;
          payload.month
          return freshState;
        }
      case deleteExercise.type: {
        const payload = action.payload;  
        return state
      }
      default:
        return state;
    }
  }

  combinedReducer = combineReducers(this.exerciseReducer);

  constructor() {
    this.loadCurrentMonthWorkout();
    this.listenToActions();
  }

  loadCurrentMonthWorkout(){
    this.currentMonthWorkout$.pipe(take(1)).subscribe((wo) => {
      this.#workouts.set(wo);
    });
  }

  listenToActions(){
    this.action$.pipe(takeUntilDestroyed()).subscribe((action) => {
      this.#workouts.update((wo) => {
        return this.combinedReducer(wo, action);
      });
    });
  }

  // updateExercise(exercise: Exercise) {
  //   this.action$.next({ action: UPDATE_EXERCISE, data: exercise });
  // }

  dispatch(action:Action){
      this.action$.next(action)
  }

}

//a function to combine all the reducers:
function combineReducers<S>(
  ...reducers: ((state: S, action: Action) => S)[]
) {
  return (state: S, action: Action) => {
    return reducers.reduce((currentState, reducer) => {
      return reducer(currentState, action);
    }, state);
  };
}
