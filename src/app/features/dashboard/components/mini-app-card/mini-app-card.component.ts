import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mini-app-card',
  standalone: true,
  imports: [CommonModule, MatCardModule,RouterLink],
  templateUrl: './mini-app-card.component.html',
  styleUrls: ['./mini-app-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniAppCardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input() cardIconUrl!: string;
  @Input({required:true}) linkToPage!:string;
}
