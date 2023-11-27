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
@Component({
  selector: 'app-workout-week-editor',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './workout-week-editor.component.html',
  styleUrl: './workout-week-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutWeekEditorComponent
  implements ControlValueAccessor, DoCheck, OnInit,OnChanges
{
  ngOnInit(): void {
    this.exerciseCount = this.week.length;
  }
  cdr = inject(ChangeDetectorRef);
  exerciseCount = 0;
  @Input() week: Exercise[] = [];
  @Input() weekNumber!: number;
  @Output() addExercise = new EventEmitter();
  @Output() removeExercise = new EventEmitter<number>();

  displayColumns = ['id','week', 'exercise'];

  ngDoCheck(): void {
  
    if (this.exerciseCount !== this.week.length) {
      //change the data source!
      console.log('ngDOchagek')
      this.exerciseCount = this.week.length;
      // this.cdr.markForCheck();
      // this.cdr.detectChanges();
    }
  }

  ngOnChanges(){
    console.log('changes!!!!')
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

  onRemoveExercise(index: number) {
    this.removeExercise.emit(index);
  }
}
