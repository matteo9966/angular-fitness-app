import {
  ChangeDetectionStrategy,
  Component,
  signal,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule } from '@angular/forms';
import { Exercise } from '../../../../core/models/Workout/IWorkout.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { WorkoutService } from '../../services/workout.service';
import { FormDirective } from 'src/app/core/directives/forms.directive';
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
  ],
  templateUrl: './exercise-form.component.html',
  styleUrl: './exercise-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExerciseFormComponent {
  @Input() week: Exercise[] = [];
  @Input() weekNumber!: number;
  formValue = signal<Partial<Exercise>>({});
  @Output() removeExercise = new EventEmitter<Exercise>();
  @Output() exerciseUpdated = new EventEmitter<Exercise>();
  @Output() addExercise = new EventEmitter();
  // exerciseList$ = this.workoutService.exerciseList$;

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
    this.formValue.set({ week: this.weekNumber, ...val });
  }

  onAddExercise() {
    this.addExercise.emit({...this.formValue()});
  }

}
