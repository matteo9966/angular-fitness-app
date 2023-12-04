import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  inject,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Exercise } from '../../../../core/models/Workout/IWorkout.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-workout-week-editor',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule],
  templateUrl: './workout-week-editor.component.html',
  styleUrl: './workout-week-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutWeekEditorComponent
  implements  OnInit, OnChanges
{
  ngOnInit(): void {
    this.exerciseCount = this.week.length;
  }
  ngOnChanges(simpleChanges: SimpleChanges) {
    console.log({simpleChanges})
    if(simpleChanges?.['formState']?.currentValue==='edit'){
      this.disableDelete=true
    }else{
      this.disableDelete=false;
    }
  }
  
  cdr = inject(ChangeDetectorRef);
  exerciseCount = 0;

  disableDelete=false;
  @Input() week: Exercise[] = [];
  @Input() weekNumber!: number;
  @Input() formState: 'edit' | 'add' = 'add';
  @Output() addExercise = new EventEmitter();
  @Output() removeExercise = new EventEmitter<Exercise>();
  @Output() editExercise = new EventEmitter<Exercise>();
  @Output() exerciseUpdated = new EventEmitter<Exercise>();
  




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
    'edit',
    'delete',
  ];

  ngDoCheck(): void {
    if (this.exerciseCount !== this.week.length) {
      this.exerciseCount = this.week.length;
    }
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

 

  
  onEditExercise(exercise: Exercise) {
    this.editExercise.emit(exercise);
  }
}
