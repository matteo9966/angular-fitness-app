import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
@Component({
  selector: 'app-button-toggle',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule],
  templateUrl: './button-toggle.component.html',
  styleUrl: './button-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonToggleComponent {
  _selected = null;
  @Input() items: { label: any; value: any }[] = [];
  @Output() change = new EventEmitter<any>();
  set selected(value: any) {
    this._selected = value;
    this.change.emit(value);
  }
  get selected() {
    return this._selected;
  }
}
