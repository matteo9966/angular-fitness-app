import { ChangeDetectionStrategy, Component } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-hero-button',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './hero-button.component.html',
  styleUrls: ['./hero-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroButtonComponent {

}
