import {
  ChangeDetectionStrategy,
  Component,
  signal,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthSelectComponent } from 'src/app/shared/components/month-select/month-select.component';
import { FormsModule } from '@angular/forms';
import { WorkoutWeekEditorComponent } from '../workout-week-editor/workout-week-editor.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Exercise } from 'src/app/core/models/Workout/IWorkout.interface';
import { ExerciseFormComponent } from '../exercise-form/exercise-form.component';
import { MatTabsModule } from '@angular/material/tabs';
import { toObservable } from '@angular/core/rxjs-interop';
import { WorkoutService } from '../../services/workout.service';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  of,
  startWith,
  tap,
  combineLatest,
} from 'rxjs';
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
    MatTabsModule,
  ],
  templateUrl: './workout-editor.component.html',
  styleUrl: './workout-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutEditorComponent {
  workoutService = inject(WorkoutService);
  _month = new Date().getMonth();
  weeks: Record<number, Exercise[]> = {};
  exerciseList = signal<Exercise[]>([]);
  formState: 'edit' | 'add' = 'add'; //on edit delete is disabled

  formValue = signal<Partial<Exercise>>({});

  exercise$ = toObservable(computed(() => this.formValue().exercise));
  exerciseList$ = this.workoutService.exerciseList$;
  exerciseAndExercuseListCombined$ = combineLatest<
    [string | undefined, string[]]
  >([
    this.exercise$.pipe(filter((s) => typeof s === 'string')),
    this.exerciseList$.pipe(startWith([])),
  ]);
  autocompleteOptions$ = this.exerciseAndExercuseListCombined$.pipe(
    debounceTime(200),
    map(([exercise, options]) => {
      if (!exercise || !options) return [];
      return options.filter((o) =>
        o.toLowerCase().includes((exercise || '').toLowerCase())
      );
    })
  );
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
   */
  addExercise(id = Math.random().toString(16).slice(2)) {
    const exerciseFormValue = this.formValue() as Exercise;
    exerciseFormValue.id = id; //ADD ID TO EXERCISE
    const week = exerciseFormValue?.week;
    if (!week) {
      return;
    }
    if (this.weeks[week]) {
      const weekExList = this.weeks[week];
      weekExList.push({ ...exerciseFormValue });
      this.weeks[week] = [...weekExList];
    } else {
      this.weeks[week] = [{ ...exerciseFormValue }];
    }
  }

  updateExercise() {
    const updatedExerciseFormValue = this.formValue() as Exercise;
    //it has an id
    if (!this.previousExerciseValue) {
      return;
    }

    const week = this.weeks[this.previousExerciseValue?.week];

    if (!week) {
      return;
    }

    const indexOfExInWeek = week.findIndex(
      (ex) => ex.id === this.previousExerciseValue?.id
    );
    if (indexOfExInWeek < 0) return;

    week.splice(indexOfExInWeek, 1); //remove
    this.addExercise(updatedExerciseFormValue.id); // readd
  }

  saveExercise() {
    if (this.formState === 'add') {
      this.addExercise();
    } else {
      this.updateExercise();
    }
    this.formState = 'add'; // always back to add
  }

  /**
   * @description makes a copy of the previous week in a new week
   */
  addWeekWithSameExercisesOfPrevWeek() {
    //get last week
    const weekNumbers = Object.keys(this.weeks);
    const lastWeek = Math.max(...weekNumbers.map((wn) => +wn));
    if (!lastWeek) return;
    this.weeks[lastWeek + 1] = [];
    this.weeks[lastWeek].forEach((exercise) => {
      this.weeks[lastWeek + 1].push({ ...exercise, week: lastWeek + 1 });
    });
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

  previousExerciseValue: Exercise | null = null;
  editExercise(exercise: Exercise) {
    this.formValueChanged(exercise);
    this.previousExerciseValue = { ...exercise };
    this.formState = 'edit';

    //disable remove
    //change form state to editing and not insert
  }
  discardChanges() {
    this.formState = 'add';
    this.previousExerciseValue = null;
    this.formValue.set({});
  }

  formValueChanged(val: any) {

    this.formValue.set({ ...val });
  }
}
