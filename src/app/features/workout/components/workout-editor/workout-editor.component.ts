import {
  ChangeDetectionStrategy,
  Component,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthSelectComponent } from 'src/app/shared/components/month-select/month-select.component';
import { FormsModule } from '@angular/forms';
import { WorkoutWeekEditorComponent } from '../workout-week-editor/workout-week-editor.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Exercise } from 'src/app/core/models/Workout/IWorkout.interface';
import { ExerciseFormComponent } from '../exercise-form/exercise-form.component';
import {MatTabsModule} from '@angular/material/tabs';
@Component({
  selector: 'app-workout-editor',
  standalone: true,
  imports: [
    CommonModule,
    MonthSelectComponent,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    WorkoutWeekEditorComponent,
    ExerciseFormComponent,
    MatTabsModule
  ],
  templateUrl: './workout-editor.component.html',
  styleUrl: './workout-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutEditorComponent {
  _month = new Date().getMonth();
  weeks: Record<number, Exercise[]> = {};
  exerciseList = signal<Exercise[]>([]);

  weeksRecord = computed<Record<number, Exercise[]>>(() => {
    return this.exerciseList().reduce<Record<number, Exercise[]>>(
      (rec, cur) => {
        const exWeek = cur.week;
        if (rec[exWeek]) {
          rec[exWeek].push(cur);
        } else {
          rec[exWeek] = [cur];
        }
        return rec;
      },
      {}
    );
  });

  get month() {
    return this._month;
  }
  set month(val: number) {
    this._month = val;
  }

  addDayEditor() {}

  addWeekEditor() {
    const weekNumber = Object.entries(this.weeks).length + 1;
    this.weeks[weekNumber] = [];
  }

  get weeksExercisesList() {
    return Object.entries(this.weeks);
  }

  /**
   * @description listens to the add event on the week editor to add to an element
   * @param week
   */
  addExercise(exercise: Exercise) {
    if (this.weeks[exercise.week]) {
      const weekExList = this.weeks[exercise.week];
      weekExList.push({ ...exercise });
      this.weeks[exercise.week] = [...weekExList];
    } else {
      this.weeks[exercise.week] = [{ ...exercise }];
    }
  }

  removeExercise(exercise: Exercise) {
    const week = this.weeks[exercise.week];
    week.splice(
      week.findIndex((ex) => ex.id === exercise.id),
      1
    );
    if (week.length == 0) {
      delete this.weeks[exercise.week];
      return;
    }
    this.weeks[exercise.week] = [...week];
  }
}

function exerciseFactory(week: number, day: number) {
  const exercise: Exercise = {
    day: day,
    exercise: '',
    exerciseRef: '',
    notes: '',
    reps: 0,
    rest: 0,
    sets: 0,
    weight: 0,
    week: week,
    userNotes: '',
    id: Math.random().toString(16).slice(2),
  };
  return exercise;
}
