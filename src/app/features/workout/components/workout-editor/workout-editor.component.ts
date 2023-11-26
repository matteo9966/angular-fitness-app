import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthSelectComponent } from 'src/app/shared/components/month-select/month-select.component';

@Component({
  selector: 'app-workout-editor',
  standalone: true,
  imports: [CommonModule,MonthSelectComponent],
  templateUrl: './workout-editor.component.html',
  styleUrl: './workout-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutEditorComponent {

}
