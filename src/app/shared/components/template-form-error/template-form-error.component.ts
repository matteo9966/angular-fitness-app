import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
  ChangeDetectorRef,
  DoCheck,
  OnChanges,
  AfterViewInit,
  SimpleChanges,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { ValidatePipe } from '../../pipes/validate.pipe';
import { deepEqual } from 'src/app/core/utils/deepEqual';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-template-form-error',
  standalone: true,
  imports: [CommonModule, ValidatePipe],
  templateUrl: './template-form-error.component.html',
  styleUrl: './template-form-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateFormErrorComponent
  implements DoCheck, OnChanges, AfterViewInit
{
  ngAfterViewInit(): void {}

  cdr = inject(ChangeDetectorRef);
  @Input() control: AbstractControl | null = null;
  @Input() touched?: boolean = false;
  @Input() valid?: boolean = false;
  originalControlValue = this.control?.value;
  subscription?: Subscription;
  ngOnChanges(simpleChanges: SimpleChanges) {
    if (!this.subscription && this.control) {
      this.subscription = this.control.statusChanges.subscribe(() => {
        console.log({
          touched: this.control?.touched,
          pristine: this.control?.pristine,
          valid: this.control?.valid,
          control: this.control,
        });
      });
    }
  }
  ngDoCheck(): void {
    if (!this.control?.value) return;
    if (this.originalControlValue !== this.control.value) {
      const equal = deepEqual(this.originalControlValue, this.control.value);
      if (!equal) {
        this.originalControlValue = { ...this.control.value };
        this.cdr.markForCheck();
      }
    }
  }

  #hidden = true;

  get hidden() {
    if (!this.control) return true;
    const isTouched = this.control.touched;
    const valid = this.control.valid;
    const isHidden = valid || !isTouched;
    this.#hidden = isHidden;
    return isHidden;
  }

  set hidden(hidden: any) {
    this.#hidden = hidden;
  }

  get controlErrors() {
    return this.control?.errors || null;
  }

  log(value: any) {
    console.log('change detection cycle: ', value);
  }
}
