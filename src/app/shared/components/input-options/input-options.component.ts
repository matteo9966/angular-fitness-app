import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-input-options',
  standalone: true,
  imports: [CommonModule,MatCardModule],
  templateUrl: './input-options.component.html',
  styleUrl: './input-options.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputOptionsComponent {
  select = new EventEmitter<{ value: any; label: string }>();
  @Input() options: { value: any; label: string }[] = [];
  log(value:any){
    console.log(value)
  }
}
