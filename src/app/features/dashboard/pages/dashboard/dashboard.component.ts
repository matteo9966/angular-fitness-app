import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/Authentication.service';
import { UserService } from 'src/app/core/services/User.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  authService = inject(AuthenticationService);
  router = inject(Router);
  userservice = inject(UserService);
  logout() {
    this.authService.signOut().subscribe((x) => {
      // this.router.navigateByUrl('/');
    });
  }
  loggedIn$ = this.userservice.isAuthenticated$;
}
