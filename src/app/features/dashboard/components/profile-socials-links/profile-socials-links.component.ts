import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { IUser } from 'src/app/core/models/User/IUser.interface';
import { SocialImagePipe } from '../../pipes/social-image.pipe';
import { ISocial } from 'src/app/core/models/ISocial.interface';

@Component({
  selector: 'app-profile-socials-links',
  standalone: true,
  imports: [SocialImagePipe, NgFor, NgIf],
  templateUrl: './profile-socials-links.component.html',
  styleUrls: ['./profile-socials-links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSocialsLinksComponent {
  @Input() socials: IUser['socials'] = [];
  @Input() socialConfig: ISocial[] = [];
}
