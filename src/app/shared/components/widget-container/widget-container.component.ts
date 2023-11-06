import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import {ROUTES} from '../../../core/shared/app-routes'
@Component({
  selector: 'app-widget-container',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule,RouterLink],
  templateUrl: './widget-container.component.html',
  styleUrls: ['./widget-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetContainerComponent {
  profileRoute = ROUTES.dashboard.absolute
}
