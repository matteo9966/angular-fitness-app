import { Exercise } from 'src/app/core/models/Workout/IWorkout.interface';
import { createAction } from './actionCreator';
const UPDATE_EXERCISE = '[EXERCISE] update exercise' as const;
const ADD_EXERCISE = '[EXERCISE] add exercise' as const;
const DELETE_EXERCISE = '[EXERCISE] delete exercise' as const;

export const updateExercise = createAction<
  typeof UPDATE_EXERCISE,
  {
    year: number;
    month: number;
    weekNumber: number;
    dayNumber: number;
    exercise: Exercise;
  }
>(UPDATE_EXERCISE);

export const deleteExercise = createAction<
  typeof DELETE_EXERCISE,
  {
    year: number;
    month: number;
    weekNumber: number;
    exercise: Exercise;
    id: string;
  }
>(DELETE_EXERCISE);

export const addExercise = createAction<
  typeof ADD_EXERCISE,
  {
    year: number;
    month: number;
    weekNumber: number;
    dayNumber: number;
    exercise: Exercise;
  }
>(ADD_EXERCISE);



export type UpdateExerciseAction = ReturnType<typeof updateExercise>;
export type DeleteExerciseAction = ReturnType<typeof deleteExercise>;
export type AddExerciseAction = ReturnType<typeof addExercise>;
