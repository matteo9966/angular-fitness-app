import { Injectable, inject, signal, computed ,effect} from '@angular/core';
import {
  Workout,
} from 'src/app/core/models/Workout/IWorkout.interface';
import {  takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { of, map, catchError, Subject, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import type { Action } from '../store/actions/Action.type';
import {
  updateExercise,
  deleteExercise,
} from '../store/actions/workoutActions';
import { updateExerciseInStore } from '../utils/updateExerciseInStore';

type State = Record<number, Workout[]>;

@Injectable()
export class WorkoutService {
  httpClient = inject(HttpClient);
  GET_WORKOUT_API = '/assets/mocks/current-month-workout.json';
  #action$ = new Subject<Action>();

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
      case updateExercise.type: {
        const freshState = { ...state };
        const updatedStore = updateExerciseInStore(
          freshState,
          action.payload.exercise,
          action.payload.year,
          action.payload.month,
          action.payload.dayNumber,
          action.payload.weekNumber
        );

        return updatedStore;
      }
      case deleteExercise.type: {
        return state;
      }
      default:
        return state;
    }
  }

  combinedReducer = combineReducers(this.exerciseReducer);

  constructor() {
    this.loadCurrentMonthWorkout();
    this.listenToActions();
    effect(()=>{
      console.log('store got updated!!!!',this.#workouts())
    })
  }

  loadCurrentMonthWorkout() {
    this.currentMonthWorkout$.pipe(take(1)).subscribe((wo) => {
      this.#workouts.set(wo);
    });
  }

  listenToActions() {
    this.#action$.pipe(takeUntilDestroyed()).subscribe((action) => {
      this.#workouts.update((wo) => {
        return this.combinedReducer(wo, action);
      });
    });
  }


  dispatch(action: Action) {
    this.#action$.next(action);
  }
}

function combineReducers<S>(...reducers: ((state: S, action: Action) => S)[]) {
  return (state: S, action: Action) => {
    return reducers.reduce((currentState, reducer) => {
      return reducer(currentState, action);
    }, state);
  };
}
