import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-socials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './socials.component.html',
  styleUrls: ['./socials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialsComponent {

}
