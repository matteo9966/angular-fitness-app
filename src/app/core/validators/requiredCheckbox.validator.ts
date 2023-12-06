import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';
import { Directive, Input } from '@angular/core';

/* 
its value is 


*/

function isObject(obj: any) {
  return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
}

export const validateCheckboxes: (checkboxes: string[]) => ValidatorFn =
  function (checkboxes) {
    return (control: AbstractControl) => {
      if (!control || !control.value || !isObject(control.value)) return null;
      const value = control.value;
      const keys = Object.keys(value);
      let valid = true;
      for (let i = 0; i < checkboxes.length && valid; i++) {
        const currentCheckboxValue = value?.[checkboxes[i]];
        if (!keys.includes(checkboxes[i]) || !currentCheckboxValue) {
          valid = false;
        }
      }
      if (!valid) {
        return {
          validateCheckboxes: checkboxes.join(' '),
        };
      }

      return null;
    };
  };

@Directive({
  selector: '[ngModelGroup][requiredCheckboxes]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: RequiredCheckbox, multi: true },
  ],
  standalone: true,
})
/**
 * @description pass a list of required fields, pass the error message if the requred field is not selected show an error
 */
export class RequiredCheckbox implements Validator {
  #required: string[] = [];
  private onChange = () => {};

  @Input({ required: true }) set requiredCheckboxes(names: string[]) {
    this.onChange();
    this.#required = names;
  }
  get requiredCheckboxes() {
    return this.#required;
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return validateCheckboxes(this.requiredCheckboxes)(control);
  }
  registerOnValidatorChange?(fn: () => void): void {
    this.onChange = fn;
  }
}
