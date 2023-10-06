import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-mini-app-card',
  standalone: true,
  imports: [CommonModule,MatCardModule],
  templateUrl: './mini-app-card.component.html',
  styleUrls: ['./mini-app-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MiniAppCardComponent {

}
