import { Exercise } from 'src/app/core/models/Workout/IWorkout.interface';
import { createAction } from './actionCreator';
const UPDATE_EXERCISE = '[EXERCISE] update exercise' as const;
const DELETE_EXERCISE = '[EXERCISE] delete exercise' as const;

export const updateExercise = createAction<{
  year: number;
  month: number;
  weekNumber: number;
  exercise: Exercise;
}>(UPDATE_EXERCISE);

export const deleteExercise = createAction<{
  year: number;
  month: number;
  weekNumber: number;
  exercise: Exercise;
  id: string;
}>(DELETE_EXERCISE);
