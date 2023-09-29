import { ChangeDetectionStrategy, Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon-info-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon-info-card.component.html',
  styleUrls: ['./icon-info-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconInfoCardComponent {
 @Input() iconUrl!:string;
 @Input() title!:string;
 @Input() description!:string;
}
