import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-authentication-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './authentication-footer.component.html',
  styleUrls: ['./authentication-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticationFooterComponent {

}
