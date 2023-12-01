import {
  ChangeDetectionStrategy,
  Component,
  Input,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { autocomplete } from '../../operators/autocomplete';
import { of, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [CommonModule, MatAutocompleteModule, MatInputModule, FormsModule],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true,
    },
  ],
})
export class AutocompleteComponent implements ControlValueAccessor {
  @Input() options: any[] = [];
   //TODO: pass a function selector
  #value$ = new BehaviorSubject('');
  disabled = false;

  autocompleteOptions$ = this.#value$.pipe(
    autocomplete(200, (text) => {
      return of(this.options.filter((op) => op?.toLowerCase()?.includes(text?.toLowerCase())));
    })
  );

  constructor() {
    this.#value$.pipe(takeUntilDestroyed()).subscribe((x) => {
      this.valueChange(x);
      this.touchedChange();
    });
  }

  valueChange = (_val: any) => {};
  touchedChange = () => {};

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {
    this.valueChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.touchedChange = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  get value() {
    return this.#value$.value;
  }
  set value(val: any) {
    this.#value$.next(val);
  }
}
