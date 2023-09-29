import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLogoComponent } from '../app-logo/app-logo.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-authentication-toolbar',
  standalone: true,
  imports: [CommonModule,AppLogoComponent,MatToolbarModule,RouterLink,RouterLinkActive],
  templateUrl: './authentication-toolbar.component.html',
  styleUrls: ['./authentication-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticationToolbarComponent {

}
