import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-social-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './social-card.component.html',
  styleUrls: ['./social-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialCardComponent {

}
