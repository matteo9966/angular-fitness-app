import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { from } from 'rxjs';
import { IUserSignup } from 'src/app/core/models/User/IUser.signup';
import { AuthenticationService } from 'src/app/core/services/Authentication.service';

@Injectable()
export class SignupService {
  authenticationService = inject(AuthenticationService);

  signup(user: IUserSignup) {
    return this.authenticationService.signupUser(user);
  }
}
