import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  Input,
  OnInit,
  AfterViewInit,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonToggleModule,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'app-vote-input',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule],
  templateUrl: './vote-input.component.html',
  styleUrl: './vote-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: VoteInputComponent,
      multi: true,
    },
  ],
})
export class VoteInputComponent
  implements OnInit, AfterViewInit, ControlValueAccessor
{
  @Input() range = [1, 10];
  @Output() selected = new EventEmitter<number>();
  votes: number[] = [];
  selectedValue: number | null = null;
  onChange(_: any) {}
  onTouched() {}
  disabled = false;
  @ViewChild('group', { read: MatButtonToggleGroup, static: true })
  group!: MatButtonToggleGroup;

  ngAfterViewInit(): void {
    this.group.change.subscribe(() => {
      this.selected.emit(this.group.value);
      this.onTouched();
      this.onChange(this.group.value);
    });
  }
  ngOnInit(): void {
    if (this.range[0] > this.range[1]) return;
    this.votes = new Array(this.range[1] - this.range[0] + 1)
      .fill(0)
      .map((_, index) => this.range[0] + index);
  }
  writeValue(obj: any): void {
    this.selectedValue = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
