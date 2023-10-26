import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DashboardPageService } from '../../services/Dashboard-page.service';
import { RouterLink } from '@angular/router';
import { ROUTES } from 'src/app/core/shared/app-routes';
/**
 * @description this copmponent will be the wrapper of every page in the dashboard
 */
@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule,RouterLink],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {
  dashboardPageService = inject(DashboardPageService)
  editUserRoute = ROUTES.dashboard.children.editUser.absolute

  logout() {
    this.dashboardPageService.logout();
  }
}
