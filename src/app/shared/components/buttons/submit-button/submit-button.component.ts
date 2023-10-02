import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-submit-button',
  standalone: true,
  imports: [CommonModule,MatButtonModule],
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubmitButtonComponent {

}
