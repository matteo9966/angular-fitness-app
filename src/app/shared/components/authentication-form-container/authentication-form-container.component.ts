import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-authentication-form-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './authentication-form-container.component.html',
  styleUrls: ['./authentication-form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticationFormContainerComponent {

}
