import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NewsCardComponent } from '../news-card/news-card.component';
import { AddMobileClassDirective } from 'src/app/shared/directives/add-mobile-class.directive';

@Component({
  selector: 'app-news-card-container',
  standalone: true,
  imports: [NewsCardComponent,AddMobileClassDirective],
  templateUrl: './news-card-container.component.html',
  styleUrls: ['./news-card-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsCardContainerComponent {

}
