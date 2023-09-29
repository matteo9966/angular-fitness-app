import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationFormContainerComponent } from 'src/app/shared/components/authentication-form-container/authentication-form-container.component';
import { TextInputComponent } from 'src/app/shared/components/text-input/text-input.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule,AuthenticationFormContainerComponent,TextInputComponent],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent {

}
