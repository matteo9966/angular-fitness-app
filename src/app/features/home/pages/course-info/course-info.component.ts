import { ChangeDetectionStrategy, Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseInfoComponent {
 @Input() courseData:any;

 
}
