import { createAction } from './actionCreator';
import { DeleteExerciseAction,UpdateExerciseAction } from './workoutActions';
export type Action = DeleteExerciseAction | UpdateExerciseAction