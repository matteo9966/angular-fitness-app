import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SlideshowComponent } from '../../components/slideshow/slideshow.component';
import { NewsCardContainerComponent } from '../../components/news-card-container/news-card-container.component';
import { TabsComponent } from "../../components/tabs/tabs.component";


@Component({
    selector: 'app-landing',
    standalone: true,
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SlideshowComponent, NewsCardContainerComponent, TabsComponent]
})
export class LandingComponent {
  title:string="Looking for the best Results?"
  subtitle:string="We have everything you need!"

}
