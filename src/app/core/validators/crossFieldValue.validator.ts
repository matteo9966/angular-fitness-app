import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export function crossFieldValidatorFn(
  compareValue: any,
  fieldNames: [string, string]
): ValidatorFn {
  return (control: AbstractControl) => {
    const controlValue = control.value;

    if (!Object.is(controlValue, compareValue)) {
      return { crossField: fieldNames };
    }
    return null;
  };
}

@Directive({
  selector: '[sameAs]',
  standalone: true,
  providers: [
    { provide: NG_VALIDATORS, useExisting: CrossFieldValidator, multi: true },
  ],
})
export class CrossFieldValidator implements Validator {
  changeFn = () => {};
  #compareValue!: string;
  @Input({ required: true })
  set sameAs(value: string) {
    this.#compareValue = value;
    this.changeFn();
  }

  @Input()
  fieldNames: [string, string] = ['', ''];

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return crossFieldValidatorFn(this.#compareValue, this.fieldNames)(control);
  }
  registerOnValidatorChange?(fn: () => void): void {
    this.changeFn = fn;
  }
}
