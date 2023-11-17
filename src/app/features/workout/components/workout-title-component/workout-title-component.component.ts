import { ChangeDetectionStrategy, Component,Input,Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Exercise } from 'src/app/core/models/Workout/IWorkout.interface';

@Component({
  selector: 'app-workout-title-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workout-title-component.component.html',
  styleUrl: './workout-title-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutTitleComponentComponent {
 @Input() exercise:Exercise|null=null;
 @Output() checked=false;


 title = this.exercise?.name;
 

}
