import {
  Injectable,
  inject,
  signal,
  computed,
  Signal,
  effect,
} from '@angular/core';
import {
  Exercise,
  Workout,
} from 'src/app/core/models/Workout/IWorkout.interface';
import { toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { of, map, catchError, Subject, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const UPDATE_EXERCISE = 'update exercise' as const;
const REMOVE_EXERCISE = 'remove exercise' as const;
type UpdateExercise = typeof UPDATE_EXERCISE;
type RemoveExercise = typeof UPDATE_EXERCISE;
type ActionExercises = UpdateExercise | RemoveExercise;

type ActionTypes = UpdateExercise;

type Action<T> = { action: ActionTypes; data: T };

type State = Record<number, Workout[]>;

//TODO: create a createAction function (check chatgpt answer)
//TODO: create a effect handler 

@Injectable()
export class WorkoutService {
  httpClient = inject(HttpClient);
  GET_WORKOUT_API = '/assets/mocks/current-month-workout.json';

  exerciseAction$ = new Subject<Action<Exercise>>();

  action$ = new Subject<Action<Exercise> | Action<Workout>>();

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

  #workouts = signal<Record<number, Workout[]>>({});

  public workouts = computed(this.#workouts);

  exerciseReducer(state: State, action: Action<Exercise>): State {
    switch (action.action) {
      case UPDATE_EXERCISE:
        const freshState = {...state};
        // const exerciseToUpdate = freshState.
        return freshState;

      default:
        return state;
    }
  }

  workoutReducer(state: State, action: Action<Workout>) {
    return state;
  }

  combinedReducer = combineReducers(this.exerciseReducer, this.workoutReducer);

  constructor() {
    //load current month workout
    this.currentMonthWorkout$.pipe(take(1)).subscribe((wo) => {
      this.#workouts.set(wo);
    });

    //FIXME: not  exercise action but action
    this.action$.pipe(takeUntilDestroyed()).subscribe((action) => {
      this.#workouts.update((wo) => {
        return this.combinedReducer(wo, action);
      });
    });
  }

  updateExercise(exercise: Exercise) {
    this.action$.next({ action: UPDATE_EXERCISE, data: exercise });
  }
}

//a function to combine all the reducers:
function combineReducers<S>(
  ...reducers: ((state: S, action: Action<any>) => S)[]
) {
  return (state: S, action: Action<any>) => {
    return reducers.reduce((currentState, reducer) => {
      return reducer(currentState, action);
    }, state);
  };
}
