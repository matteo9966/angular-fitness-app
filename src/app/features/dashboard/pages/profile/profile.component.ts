import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiniAppCardComponent } from '../../components/mini-app-card/mini-app-card.component';
import { UserService } from '../../services/User.service';
import { map } from 'rxjs';
import { RouterLink } from '@angular/router';
// import { UserService } from '../../services/User.service';
import {ROUTES} from '../../../../core/shared/app-routes';
import { ProfileSocialsLinksComponent } from '../../components/profile-socials-links/profile-socials-links.component';
import { ConfigurationService } from 'src/app/core/services/configuration.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MiniAppCardComponent,RouterLink,ProfileSocialsLinksComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  editUserRoute = ROUTES.dashboard.children.editUser.absolute;
  configService = inject(ConfigurationService);
  userService = inject(UserService);
  user$ = this.userService.userData$;
  socialsConfig = this.configService.SOCIALS_CONFIG;
  
  ngOnInit() {}

  get name$() {
    return this.user$.pipe(map((user) => user?.name));
  }
  get uid$() {
    return this.user$.pipe(map((user) => user?.id));
  }
  get email$() {
    return this.user$.pipe(map((user) => user?.email));
  }

  get bio$(){
    return this.user$.pipe(map((user)=>user?.bio));
  }

  get backgroundImg$(){
    return this.user$.pipe(map((user)=>user?.backgroundImg))
  }
  get gender$(){
    return this.user$.pipe(map(user=>user?.gender));
  }

  get profileImg$(){
    return this.user$.pipe(map(us=>us?.profileImg||'https://picsum.photos/200/200'))
  }

  get socials$(){
    return this.user$.pipe(map(user=>user?.socials||[]))
  }

}
