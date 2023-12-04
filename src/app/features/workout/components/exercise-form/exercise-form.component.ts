import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Exercise } from '../../../../core/models/Workout/IWorkout.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormDirective } from 'src/app/core/directives/forms.directive';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-exercise-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormDirective,
    MatAutocompleteModule,
  ],
  templateUrl: './exercise-form.component.html',
  styleUrl: './exercise-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExerciseFormComponent {
  @Input() week: Exercise[] = [];
  @Input() weekNumber!: number;
  @Input() autocompleteOptions: string[] = [];
  @Input() formValue: Partial<Exercise> = {};
  @Input() formState:'edit'|'add'='add';
  @Output() removeExercise = new EventEmitter<Exercise>();
  @Output() exerciseUpdated = new EventEmitter<Exercise>();
  @Output() saveExercise = new EventEmitter();
  @Output() makeCopyOfWeek = new EventEmitter();
  @Output() discardChanges = new EventEmitter();
  @Output() formChange = new EventEmitter<Exercise>();

  constructor() {}

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

  formValueChanged(val: any) {
    this.formChange.emit(val);
  }

  onSaveExercise() {
    this.saveExercise.emit();
  }

  onDiscardChanges(){
    this.discardChanges.emit();
  }

  copyLastWeek() {
    this.makeCopyOfWeek.emit();
  }
}
