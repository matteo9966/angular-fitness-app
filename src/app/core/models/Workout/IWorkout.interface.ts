interface Workout {
  month: number;
  year: number;
  weeks: Week[];
  notes: string;
}

interface Week {
  weekNumber: number;
  days: Day[];
  notes: string;
}

interface Day {
  exercises: Exercise[];
  dayNumber: number;
  notes: string;
}

interface Exercise {
  name: string;
  exerciseRef: string; //id to the exercise ref
  series: number;
  repetitions: number;
  weight:number;
  rest: number;
  notes: string;
}

interface ExerciseRef {
  groupMuscle: string;
  name: string;
  id: string;
  externalLink: string;
  imageUrl: string;
  description: string;
}

export { Workout, Day, Exercise, ExerciseRef, Week };
