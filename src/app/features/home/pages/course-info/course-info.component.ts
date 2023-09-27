import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { IcourseData } from 'src/app/core/models/IcourseData.interface';
import { AddMobileClassDirective } from 'src/app/shared/directives/add-mobile-class.directive';


@Component({
  selector: 'app-course-info',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule,AddMobileClassDirective],
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseInfoComponent {
  @Input() courseData!: IcourseData;

  get title() {
    return this.courseData.title;
  }

  get description() {
    return this.courseData.description;
  }

  get subtitle() {
    return this.courseData.subtitle;
  }

  get longDescription() {
    return this.courseData.longDescription;
  }

  get shortDescription() {
    return this.courseData.shortDescription;
  }

  get difficultyLevel() {
    return this.courseData.difficultyLevel;
  }

  get extraDescriptions() {
    return this.courseData.extraDescriptions;
  }
}
