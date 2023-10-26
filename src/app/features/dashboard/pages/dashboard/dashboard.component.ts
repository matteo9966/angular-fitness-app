import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/Authentication.service';

import { MatSidenavModule } from '@angular/material/sidenav';
import { DashboardPageComponent } from '../../components/dashboard-page/dashboard-page.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { ResponsiveLayoutService } from 'src/app/core/services/responsive-layout.service';
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
  responsiveService = inject(ResponsiveLayoutService);

  isSmallDevice$ = this.responsiveService.isSmallDevice$;

  logout() {
    this.authService.signout().subscribe((x) => {
      // this.router.navigateByUrl('/');
    });
  }

  expanded = true;
}
