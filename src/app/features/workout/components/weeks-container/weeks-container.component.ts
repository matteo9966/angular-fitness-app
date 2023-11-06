import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weeks-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weeks-container.component.html',
  styleUrls: ['./weeks-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeeksContainerComponent {

}
