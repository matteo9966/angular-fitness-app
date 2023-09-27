import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ImageCardComponent } from '../image-card/image-card.component';
@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, MatTabsModule, JsonPipe, ImageCardComponent],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  tabsConfig = [
    {
      tabLabel: 'Weight loss',
      programs: [
        {
          title: 'Light program',
          imageUrl:
            'https://assets.website-files.com/55f33a0152c98c9a451281aa/5e344812c4538237bd5a6498_rope-jumping-ropes-human-training-28080.jpg',
          actionLabel: 'Info',
          linkToInfo: 'fatlossAdvanced',
        },
        {
          title: 'Regular program',
          imageUrl:
            'https://assets.website-files.com/55f33a0152c98c9a451281aa/5e34481da7e40a141e5221b5_photo-of-man-with-muscular-body-1547248.jpg',
          actionLabel: 'Info',
          linkToInfo: 'fatLossIntermediate',
        },
        {
          title: 'Hard program',
          imageUrl:
            'https://assets.website-files.com/55f33a0152c98c9a451281aa/5e34488aa7e40a995c5223b5_person-wearing-black-shorts-and-blue-lace-up-low-top-sneaker-841131.jpg',
          actionLabel: 'Info',
          linkToInfo: 'fatLossBeginner',
        },
      ],
    },
  ];
}
