import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutEditorComponent } from '../../components/workout-editor/workout-editor.component';

@Component({
  selector: 'app-edit-workout',
  standalone: true,
  imports: [CommonModule,WorkoutEditorComponent],
  templateUrl: './edit-workout.component.html',
  styleUrl: './edit-workout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditWorkoutComponent {

}
