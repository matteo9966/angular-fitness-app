import { ChangeDetectionStrategy, Component, Input, } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {  NgClass } from '@angular/common';
@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [MatCardModule,NgClass],
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsCardComponent {
  @Input() color: 'primary' | 'secondary' | 'plain' = 'primary';
}
