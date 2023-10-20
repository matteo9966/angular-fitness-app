import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner-component',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './spinner-component.component.html',
  styleUrls: ['./spinner-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {

}
