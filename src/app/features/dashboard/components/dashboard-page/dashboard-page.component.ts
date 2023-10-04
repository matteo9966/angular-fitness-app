import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
/**
 * @description this copmponent will be the wrapper of every page in the dashboard
 */
@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule,MatCardModule],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent {

}
