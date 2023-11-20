import { createAction } from './actionCreator';
import { updateExercise, deleteExercise } from './workoutActions';
export type Action =
  | ReturnType<typeof updateExercise>
  | ReturnType<typeof deleteExercise>;
