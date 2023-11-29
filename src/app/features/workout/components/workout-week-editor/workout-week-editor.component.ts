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
    MatIconModule
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
  exerciseCount = 0;
  @Input() week: Exercise[] = [];
  @Input() weekNumber!: number;
  @Output() addExercise = new EventEmitter();
  @Output() removeExercise = new EventEmitter<Exercise>();
  numberList = Array(29)
    .fill('')
    .map((a, i) => i + 1);

  weightList = Array(300)
    .fill(null)
    .map((_, i) => i + 1);

  restIntervals = Array(10).fill(null).map((_,i)=>15*i)

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
  displayColumns = ['exercise', 'weight', 'sets', 'reps', 'rest',"delete"];

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
    this.addExercise.emit(this.weekNumber);
  }

  onRemoveExercise(exercise:Exercise) {
    this.removeExercise.emit(exercise);
  }
}
