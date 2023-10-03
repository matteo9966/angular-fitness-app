import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationFormContainerComponent } from 'src/app/shared/components/authentication-form-container/authentication-form-container.component';
import { TextInputComponent } from 'src/app/shared/components/text-input/text-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { SubmitButtonComponent } from 'src/app/shared/components/buttons/submit-button/submit-button.component';
import { LoginFormService } from '../../services/loginForm.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    AuthenticationFormContainerComponent,
    TextInputComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SubmitButtonComponent,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  formService = inject(LoginFormService);
  passwordControl = this.formService.passwordControl;
  emailControl = this.formService.emailControl;
  emailErrorMsg$ = this.formService.emailErrorMessage$;
  passwordErrorMsg$ = this.formService.passwordErrorMessage$;
  form = this.formService.form;
  submit = this.formService.submit;
  constructor() {}
}
