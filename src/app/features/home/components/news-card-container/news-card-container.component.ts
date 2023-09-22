import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsCardComponent } from '../news-card/news-card.component';

@Component({
  selector: 'app-news-card-container',
  standalone: true,
  imports: [CommonModule,NewsCardComponent],
  templateUrl: './news-card-container.component.html',
  styleUrls: ['./news-card-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsCardContainerComponent {

}
