import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationToolbarComponent } from 'src/app/shared/components/authentication-toolbar/authentication-toolbar.component';
import { FormComponent } from '../../components/form/form.component';
import { IconInfoCardComponent } from '../../components/icon-info-card/icon-info-card.component';
import { signupPageFeaturesMock } from 'src/app/core/mocks/featuresMocks';
import { AddMobileClassDirective } from 'src/app/shared/directives/add-mobile-class.directive';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, AuthenticationToolbarComponent, FormComponent,IconInfoCardComponent,AddMobileClassDirective],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {

  featuresData = signupPageFeaturesMock;

}
