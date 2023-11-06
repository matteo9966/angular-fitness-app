import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
@Component({
  selector: 'app-chips',
  standalone: true,
  imports: [CommonModule, MatChipsModule],
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsComponent {
  @Output() chipClicked: EventEmitter<string> = new EventEmitter();
  @Input() chipLabels: string[] = [];
  @Input() uncheckedChips: string[] = [];
  @Input() withAction:boolean = false; // action if clicking on chip
  onChipClick(name: string) {
    if(!this.withAction) return;
    this.chipClicked.emit(name);
  }
}
