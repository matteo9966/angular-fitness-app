import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { GenderSelectorComponent } from 'src/app/shared/components/gender-selector/gender-selector.component';
import { SocialMediaFormInputComponent } from 'src/app/shared/components/social-media-form-input-container/social-media-form-input.component';
import { NgForOf } from '@angular/common';
import { SocialMediaInputComponent } from 'src/app/shared/components/social-media-input/social-media-input.component';
import { ConfigurationService } from 'src/app/core/services/configuration.service';
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
    RouterModule,
    MatButtonToggleModule,
    GenderSelectorComponent,
    SocialMediaFormInputComponent,
    NgForOf,
    SocialMediaInputComponent,
  ],
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditUserFormComponent {
  profileRoute = ROUTES.dashboard.children.profile.absolute;
  formService = inject(EditUserFormService);
  configService = inject(ConfigurationService);
  socials = this.configService.SOCIALS_CONFIG;

  get form() {
    return this.formService.form;
  }

  get nameControl() {
    return this.form.controls.name;
  }

  get bioControl() {
    return this.form.controls.bio;
  }

  get genderControl() {
    return this.form.controls.gender;
  }

  get socialsArrayControl() {
    return this.form.controls.socials as unknown as FormArray<FormGroup<any>>;
  }

  deleteSocialMedia(i: number) {
    this.formService.deleteSocialMedia(i);
  }

  submitform() {
    this.formService.submitForm();
  }
}
