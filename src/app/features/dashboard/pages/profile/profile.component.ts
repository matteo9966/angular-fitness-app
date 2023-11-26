import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiniAppCardComponent } from '../../components/mini-app-card/mini-app-card.component';
import { UserService } from '../../services/User.service';
import { RouterLink } from '@angular/router';
import { ROUTES } from '../../../../core/shared/app-routes';
import { ProfileSocialsLinksComponent } from '../../components/profile-socials-links/profile-socials-links.component';
import { ConfigurationService } from 'src/app/core/services/configuration.service';
import { ResponsiveLayoutService } from 'src/app/core/services/responsive-layout.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MiniAppCardComponent,
    RouterLink,
    ProfileSocialsLinksComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  editUserRoute = ROUTES.dashboard.children.editUser.absolute;
  configService = inject(ConfigurationService);
  userService = inject(UserService);
  responsiveService = inject(ResponsiveLayoutService);
  user = this.userService.user;
  socialsConfig = this.configService.SOCIALS_CONFIG;
  workoutPagePath = ROUTES.apps.children.workout.children.viewWorkout.absolute;
  workoutEditorPath= ROUTES.apps.children.workout.children.editWorkout.absolute;
  isSmallDevice$ = this.responsiveService.isSmallDevice$;
  ngOnInit() {}

  get name() {
    return this.user()?.name || '';
  }
  get uid() {
    return this.user()?.id || 'no-id';
  }
  get email() {
    return this.user()?.email || ' no-email';
  }

  get bio() {
    return this.user()?.bio || ' no available -bio';
  }

  get backgroundImg() {
    return this.user()?.backgroundImg || '';
  }
  get gender() {
    return this.user()?.gender

  }

  get profileImg() {
return this.user()?.profileImg || 'https://picsum.photos/200/200'
  }

  get socials() {
  return this.user()?.socials || []
  }
}
