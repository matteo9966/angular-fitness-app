import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AddMobileClassDirective } from 'src/app/shared/directives/add-mobile-class.directive';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgFor,AddMobileClassDirective],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  socials = [
    {
      name: 'Instagram',
      iconUrl:
        'https://assets.website-files.com/55f3386352c98c9a451280f9/55d98b879d30fa076a795d16_Icon-instagram.png',
    },
    {
      name: 'YouTube',
      iconUrl:
        'https://assets.website-files.com/55f3386352c98c9a451280f9/55d98b7d8d1798173175f3ec_Icon-youtube.png',
    },
    {
      name: 'Facebook',
      iconUrl:
        'https://assets.website-files.com/55f3386352c98c9a451280f9/55d98b009d30fa076a795d0c_Icon-facebook.png',
    },
    {
      name: 'Twitter',
      iconUrl:
        'https://assets.website-files.com/55f3386352c98c9a451280f9/55d98b745dd5b6066a91c9d8_Icon-twitter.png',
    },
  ];

  constructor() {}
}
