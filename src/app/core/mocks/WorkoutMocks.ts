import { Workout } from '../models/Workout/IWorkout.interface';

export const workout: Workout = {
  month: 10,
  notes: 'Notes on the october workout',
  weeks: [
    {
      days: [
        {
          dayNumber: 1,
          exercises: [
            {
              exerciseRef: 'shoulder-press-id',
              name: 'sh. press',
              notes: 'shoulder press slow down reps',
              repetitions: 2,
              rest: 2,
              series: 3,
            },
            {
              exerciseRef: 'military-press-id',
              name: 'm. press',
              notes: 'shoulder press slow down reps',
              repetitions: 2,
              rest: 2,
              series: 3,
            },
            {
              exerciseRef: 'leg-press-id',
              name: 'leg. press',
              notes: 'shoulder press slow down reps',
              repetitions: 12,
              rest: 2,
              series: 3,
            },
          ],
          notes: 'some random notes on the exercise',
        },
        {
          dayNumber: 2,
          exercises: [
            {
              exerciseRef: 'shoulder-press-id',
              name: 'sh. press',
              notes: 'shoulder press slow down reps',
              repetitions: 2,
              rest: 2,
              series: 3,
            },
            {
              exerciseRef: 'military-press-id',
              name: 'm. press',
              notes: 'shoulder press slow down reps',
              repetitions: 2,
              rest: 2,
              series: 3,
            },
            {
              exerciseRef: 'leg-press-id',
              name: 'leg. press',
              notes: 'shoulder press slow down reps',
              repetitions: 12,
              rest: 2,
              series: 3,
            },
          ],
          notes: 'some random notes on the exercise',
        },
        {
          dayNumber: 3,
          exercises: [
            {
              exerciseRef: 'shoulder-press-id',
              name: 'sh. press',
              notes: 'shoulder press slow down reps',
              repetitions: 2,
              rest: 2,
              series: 3,
            },
            {
              exerciseRef: 'military-press-id',
              name: 'm. press',
              notes: 'shoulder press slow down reps',
              repetitions: 2,
              rest: 2,
              series: 3,
            },
            {
              exerciseRef: 'leg-press-id',
              name: 'leg. press',
              notes: 'shoulder press slow down reps',
              repetitions: 12,
              rest: 2,
              series: 3,
            },
          ],
          notes: 'some random notes on the exercise',
        },
      ],
      notes: 'notes on this week',
      weekNumber: 1,
    },
    {
      days: [],
      notes: 'notes on this week',
      weekNumber: 2,
    },
    {
      days: [],
      notes: 'notes on this week',
      weekNumber: 3,
    },
    {
      days: [],
      notes: 'notes on this week',
      weekNumber: 4,
    },
  ],
  year: 2023,
};


