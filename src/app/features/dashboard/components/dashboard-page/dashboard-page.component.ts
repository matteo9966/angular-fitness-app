import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticationService } from 'src/app/core/services/Authentication.service';
/**
 * @description this copmponent will be the wrapper of every page in the dashboard
 */
@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatIconModule],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent {
  authenticationService = inject(AuthenticationService)

  logout(){
    this.authenticationService.signOut();
  }
}
