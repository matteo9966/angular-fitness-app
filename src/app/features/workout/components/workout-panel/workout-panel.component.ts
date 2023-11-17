import { ChangeDetectionStrategy, Component,EventEmitter,Input,Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import { ExerciseTableComponent } from '../exercise-table/exercise-table.component';
import { Exercise } from 'src/app/core/models/Workout/IWorkout.interface';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule,MatCheckboxChange} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-workout-panel',
  standalone: true,
  imports: [CommonModule,MatExpansionModule,ExerciseTableComponent,MatCardModule,MatCheckboxModule,FormsModule],
  templateUrl: './workout-panel.component.html',
  styleUrl: './workout-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutPanelComponent {
 @Input() exerciseList:Exercise[] = []
 @Output() exerciseUpdated = new EventEmitter<Exercise>()

 onChange($event:MatCheckboxChange,exercise:Exercise){
  const event = $event;
  this.exerciseUpdated.emit({...exercise,completed:event.checked})
 }

}
