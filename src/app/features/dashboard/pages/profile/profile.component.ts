import { ChangeDetectionStrategy, Component,Input,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUser } from 'src/app/core/models/User/IUser.interface';
import { UserService } from 'src/app/core/services/User.service';
// import { UserService } from '../../services/User.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
 userService = inject(UserService);
 ngOnInit(){
  // console.log(this.user)
 this.userService.user$.subscribe(user=>console.log(user))
}
}
