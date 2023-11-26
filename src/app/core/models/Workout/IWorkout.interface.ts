interface Workout {
  month: number;
  year: number;
  notes: string;
  completed: boolean;
  userNotes: string;
  workout:Day[]
}


interface Week {
  weekNumber: number;
  days: Day[];
  notes: string;
  completed: boolean;
  userNotes?: string;
}

/* 
 {
      "week": 4,
      "day": 4,
      "exercise": "abs",
      "weight": 10,
      "sets": 5,
      "reps": 45,
      "rest": "",
      "notes": "no rest, just carry on"
    }

*/

interface Day {
  week:number;
  day:number;
  exercise:string;
  sets:number;
  reps:number;
  rest:number;
  notes:string;
  exercises: VariableExercise[];
  dayNumber: number;
  userNotes?: string;
  exerciseRef:string;
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
