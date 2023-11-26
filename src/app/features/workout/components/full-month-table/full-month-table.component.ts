import { Input, ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Day } from 'src/app/core/models/Workout/IWorkout.interface';

@Component({
  selector: 'app-full-month-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './full-month-table.component.html',
  styleUrl: './full-month-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullMonthTableComponent {
  @Input() days: Day[] = [];

  get displayedColumns() {
    return ['week', 'day', 'exercise', 'weight', 'sets', 'reps', 'rest', 'notes']
    // ['week', 'day', 'exercise', 'weight', 'sets', 'reps', 'rest', 'notes']
  }
}
