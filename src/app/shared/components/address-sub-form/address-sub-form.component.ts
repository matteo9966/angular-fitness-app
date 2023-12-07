import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address-sub-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './address-sub-form.component.html',
  styleUrl: './address-sub-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressSubFormComponent {

}
