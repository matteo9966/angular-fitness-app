import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { formViewProvider } from 'src/app/core/providers/formViewProvider';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';

type Address = Partial<{road:string,city:string}>
@Component({
  selector: 'app-address-sub-form',
  standalone: true,
  imports: [CommonModule,FormsModule,MatInputModule,MatFormFieldModule],
  templateUrl: './address-sub-form.component.html',
  styleUrl: './address-sub-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [formViewProvider],
})
export class AddressSubFormComponent {
 @Input() name="address"
 @Input({required:true}) address:Address={}
}
