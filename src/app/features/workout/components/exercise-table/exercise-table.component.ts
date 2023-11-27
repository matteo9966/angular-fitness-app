import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Exercise } from 'src/app/core/models/Workout/IWorkout.interface';
import { ResponsiveLayoutService } from 'src/app/core/services/responsive-layout.service';
import { map } from 'rxjs';
const staticSets = {
  exerciseRef: 'shoulder-press-id',
  name: 'Shoulder press',
  notes: 'slow your reps to maximize gainz',
  repetitions: 21,
  rest: 12,
  sets: 4,
  weight: 34,
  completed: false,
  userNotes: '',
};
const ELEMENT_DATA = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-exercise-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './exercise-table.component.html',
  styleUrl: './exercise-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExerciseTableComponent {
  smallDeviceClass$ = inject(ResponsiveLayoutService).isSmallDevice$.pipe(
    map((isSmall) => (isSmall ? 'small' : ''))
  );

  // @Input() staticSets: Exercise | null = staticSets;
  @Input() variableSets: Exercise | null = null;
  @Input() displayedColumns: string[] = [
    'repetitions',
    'rest',
    'sets',
    'weight',
  ];

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  // dataSource = this.staticSets
  //   ? [this.staticSets]
  //   : this.variableSets
  //   ? [this.variableSets]
  //   : [];
}
