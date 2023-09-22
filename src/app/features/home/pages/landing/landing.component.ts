import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SlideshowComponent } from '../../components/slideshow/slideshow.component';
import { NewsCardContainerComponent } from '../../components/news-card-container/news-card-container.component';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [SlideshowComponent,NewsCardContainerComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent {
  title:string="Looking for the best Results?"
  subtitle:string="We have everything you need!"

}
