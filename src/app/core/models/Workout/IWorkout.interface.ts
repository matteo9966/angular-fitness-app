interface Workout {
  month: number;
  year: number;
  weeks: Week[];
  notes: string;
  completed: boolean;
  userNotes: string;
}

interface Week {
  weekNumber: number;
  days: Day[];
  notes: string;
  completed: boolean;
  userNotes?: string;
}

interface Day {
  exercises: VariableExercise[];
  dayNumber: number;
  notes: string;
  completed: boolean;
  userNotes?: string;
}

interface Exercise {
  name: string;
  exerciseRef: string; //id to the exercise ref
  notes: string;
  completed: boolean;
  userNotes?: string;
}

type VariableExercise =
  | (Exercise & {
      variableSets?: [number, number, number][]; //weigth reps rest
    })
  | (Exercise & {
      sets: number | null;
      repetitions: number | null;
      weight: number | null;
      rest: number | null;
    });

interface ExerciseRef {
  groupMuscle: string;
  name: string;
  id: string;
  externalLink: string;
  imageUrl: string;
  description: string;
}

export { Workout, Day, VariableExercise as Exercise, ExerciseRef, Week };
