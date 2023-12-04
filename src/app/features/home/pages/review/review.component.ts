import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewFormComponent } from './components/review-form/review-form.component';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule,ReviewFormComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewComponent {

}
