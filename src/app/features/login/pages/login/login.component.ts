import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../../components/form/form.component';
import { AuthenticationToolbarComponent } from 'src/app/shared/components/authentication-toolbar/authentication-toolbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormComponent,AuthenticationToolbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

}
