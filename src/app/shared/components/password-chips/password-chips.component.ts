import { ChangeDetectionStrategy, Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
@Component({
  selector: 'app-password-chips',
  standalone: true,
  imports: [CommonModule,MatChipsModule],
  templateUrl: './password-chips.component.html',
  styleUrls: ['./password-chips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordChipsComponent {
 @Input() chipLabels:string[] = []
 @Input() uncheckedChips:string[]=[]
}
