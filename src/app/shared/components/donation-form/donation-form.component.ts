import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
export type DonationModel = Partial<{
  amount: number;
  message: string;
}>;

@Component({
  selector: 'app-donation-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule,MatIconModule,MatButtonModule],
  templateUrl: './donation-form.component.html',
  styleUrl: './donation-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders:[{
    provide:ControlContainer,
    useExisting:NgForm
  }]
})
export class DonationFormComponent {
  donation=0;
}
