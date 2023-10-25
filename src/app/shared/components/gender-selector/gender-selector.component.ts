import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  MatButtonToggleModule,
  MatButtonToggleGroup,
  MatButtonToggleChange,
} from '@angular/material/button-toggle';
@Component({
  selector: 'app-gender-selector',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule, FormsModule],
  templateUrl: './gender-selector.component.html',
  styleUrls: ['./gender-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => GenderSelectorComponent),
    },
  ],
})
export class GenderSelectorComponent implements ControlValueAccessor {
  genderConfig = [
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
    { label: 'Other', value: 'other' },
  ];
  toggleGroup!: MatButtonToggleGroup;
  private _value: any = null;
  onChange: (val: string) => void = (val: any) => {};
  onTouched: any = () => {};
  disabled = false;
  get value() {
    return this._value;
  }

  set value(value: any) {
    if (this._value == value) {
      return;
    }
    this._value = value;
  }
  writeValue(value: any): void {
    this.value = value;
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

  onChangeValue(event: MatButtonToggleChange) {
    this.onChange(event.value);
  }
}
