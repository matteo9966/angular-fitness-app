import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from 'src/app/shared/components/text-input/text-input.component';
import { SubmitButtonComponent } from 'src/app/shared/components/buttons/submit-button/submit-button.component';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { EditUserFormService } from '../../services/edit-user-form.service';
import { Router, RouterModule } from '@angular/router';
import { ROUTES } from 'src/app/core/shared/app-routes';
@Component({
  selector: 'app-edit-user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TextInputComponent,
    SubmitButtonComponent,
    MatExpansionModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatNativeDateModule,
    RouterModule
  ],
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditUserFormComponent {
  profileRoute = ROUTES.dashboard.children.profile.absolute
  formService = inject(EditUserFormService);

  get form() {
    return this.formService.form;
  }

  get nameControl() {
    return this.form.controls.name;
  }

  get bioControl() {
    return this.form.controls.bio;
  }

  submitform(){
    this.formService.submitForm();
  }



}
