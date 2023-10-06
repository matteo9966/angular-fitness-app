import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/Authentication.service';
import { UserService } from 'src/app/core/services/User.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DashboardPageComponent } from '../../components/dashboard-page/dashboard-page.component';
import { animate, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    DashboardPageComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    // trigger('navigation', [
    //   transition(':enter', [
    //     style({ 'width': '40px' }),
    //     animate('1s', style({ 'width': '300px' })),
    //     style({width:'300px'})
    //   ]),
    //   transition(':leave', [
    //     style({ 'max-width': '300px'}),
    //     animate('1s', style({ 'width': '40px' })),
    //     style({width:'40px'})
    //   ]),
    // ]),
  ],
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
  expanded = true;
}
