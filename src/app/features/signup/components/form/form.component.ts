import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TextInputComponent } from 'src/app/shared/components/text-input/text-input.component';
import { MatButtonModule } from '@angular/material/button';
import { AuthenticationFormContainerComponent } from 'src/app/shared/components/authentication-form-container/authentication-form-container.component';
import { AddMobileClassDirective } from 'src/app/shared/directives/add-mobile-class.directive';
import { SignupFormService } from '../../services/signup-form.service';
import { SubmitButtonComponent } from 'src/app/shared/components/buttons/submit-button/submit-button.component';
import { PasswordChipsComponent } from 'src/app/shared/components/password-chips/password-chips.component';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    TextInputComponent,
    ReactiveFormsModule,
    MatButtonModule,
    AuthenticationFormContainerComponent,
    AddMobileClassDirective,
    SubmitButtonComponent,
    PasswordChipsComponent,
    MatTooltipModule
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  formService = inject(SignupFormService);
  form: FormGroup = this.formService.form;
  nameControl = this.formService.nameControl;
  passwordControl = this.formService.passwordControl;
  emailControl = this.formService.emailControl;
  nameErrorMessage$ = this.formService.nameErrorMessage$;
  emailErrorMessage$ = this.formService.emailErrorMessage$;
  passwordErrorMessage$ = this.formService.passwordErrorMessage$;
  submit = this.formService.onSubmit;
  passwordLabels = this.formService.passwordValidationLabels;
  // passwordErrors = this.formService.passwordErrors
  tooltipMessage = this.formService.tooltipMessage;
  passwordErrors$ = this.formService.passwordErrors$;


}
