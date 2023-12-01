import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  DoCheck,
  inject,
  ChangeDetectorRef,
  OnChanges,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ControlValueAccessor, FormsModule } from '@angular/forms';
import { Exercise } from '../../../../core/models/Workout/IWorkout.interface';
import { TextInputComponent } from 'src/app/shared/components/text-input/text-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { AutocompleteComponent } from 'src/app/shared/components/autocomplete/autocomplete.component';
import { WorkoutService } from '../../services/workout.service';
import { FormDirective } from 'src/app/core/directives/forms.directive';

@Component({
  selector: 'app-workout-week-editor',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    FormDirective,
    AutocompleteComponent,
  ],
  templateUrl: './workout-week-editor.component.html',
  styleUrl: './workout-week-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutWeekEditorComponent
  implements ControlValueAccessor, OnInit
{
  ngOnInit(): void {
    this.exerciseCount = this.week.length;
  }
  cdr = inject(ChangeDetectorRef);
  workoutService = inject(WorkoutService);
  exerciseCount = 0;
  formValue = signal<Partial<Exercise>>({});
  @Input() week: Exercise[] = [];
  @Input() weekNumber!: number;
  @Output() addExercise = new EventEmitter();
  @Output() removeExercise = new EventEmitter<Exercise>();
  @Output() exerciseUpdated = new EventEmitter<Exercise>();

  exerciseList$ = this.workoutService.exerciseList$;

  numberList = Array(5)
    .fill('')
    .map((a, i) => i + 1);

  weightList = Array(10)
    .fill(null)
    .map((_, i) => i + 1);

  restIntervals = Array(10)
    .fill(null)
    .map((_, i) => 15 * i);

  days = [1, 2, 3, 4, 5, 6, 7];

  options = ['dogo1', 'gato2', 'tarty3'];
  /*   
  week:number;
  day:number;
  exercise:string;
  sets:number;
  reps:number;
  rest:number;
  notes:string;
  userNotes?: string;
  exerciseRef:string;
  id:string; 
  */
  displayColumns = [
    'exercise',
    'day',
    'weight',
    'sets',
    'reps',
    'rest',
    'delete',
  ];

  ngDoCheck(): void {
    if (this.exerciseCount !== this.week.length) {
      this.exerciseCount = this.week.length;
    }
  }

  writeValue(obj: any): void {
    // throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    // throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    // throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }

  onAddExercise() {
    this.addExercise.emit({...this.formValue()});
  }

  onRemoveExercise(exercise: Exercise) {
    this.removeExercise.emit(exercise);
  }

  get lastInsertedDay() {
    return this.week.reduce((max, cur) => {
      if (cur.day > max) {
        return cur.day;
      }
      return max;
    }, 0);
  }

  updateExercise(exercise: Exercise, partialUpdate: Partial<Exercise>) {
    const updatedExercise = { ...exercise, ...partialUpdate };
    this.exerciseUpdated.emit(updatedExercise);
  }

  exerciseChange(exercise: Exercise) {
    return (value: any) => {
      console.log(value);
      // this.updateExercise(exercise, { exercise: value });
    };
  }

  #value = '';
  get value() {
    return this.#value;
  }

  formValueChanged(val: any) {
    this.formValue.set({ week: this.weekNumber, ...val });
  }

}
