import {
  Exercise,
  Workout,
} from 'src/app/core/models/Workout/IWorkout.interface';

export function updateExerciseInStore(
  store: Record<number, Workout[]>,
  exercise: Exercise,
  year: number,
  month: number,
  dayNumber: number,
  weekNumber: number
): Record<number, Workout[]> {
  const yearWorkouts = store[year];
  if (!yearWorkouts) return store;
  const monthWorkout = yearWorkouts.find((wo) => wo.month == month);
  if (!monthWorkout) return store;
  const weekWorkout = monthWorkout.weeks.find(
    (w) => w.weekNumber === weekNumber
  );
  if (!weekWorkout) return store;
  const dayOfWoIdx = weekWorkout.days.findIndex(
    (d) => d.dayNumber == dayNumber
  );
  if (!dayOfWoIdx) return store;
  const exerciseIdx = weekWorkout.days[dayOfWoIdx].exercises.findIndex(
    (d) => d.name === exercise.name
  );
  if (!exerciseIdx) return store;
  weekWorkout.days[dayOfWoIdx].exercises[exerciseIdx] = exercise;
  return store;
}
