import { ChangeDetectionStrategy, Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-app-logo',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './app-logo.component.html',
  styleUrls: ['./app-logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLogoComponent {
 @Input() size:'small'|'medium'|'large'='large';
}
