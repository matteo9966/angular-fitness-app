import { Injectable, signal } from '@angular/core';
import { workout } from 'src/app/core/mocks/WorkoutMocks';
import { Workout } from 'src/app/core/models/Workout/IWorkout.interface';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  //store the workouts in year :workout format
  workouts = signal<Record<number, Workout[]>>({
    2023: [workout],
  });
  constructor() {}
}
