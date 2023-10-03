import {
  FormControl,
  ValidatorFn,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import * as PasswordValidator from 'password-validator';
const skema = new PasswordValidator();
skema
  .is()
  .min(6) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(1) // Must have at least 2 digits
  .has()
  .not()
  .spaces();

export const validatePassword: ValidatorFn = (control: AbstractControl) => {
  if (!control.value) {
    return { password: true };
  }
  return null;
  //   const value = control.value;
  //   const validation = skema.validate(value, { list: true });
  //   let message: string = 'Validation errors: ';

  //   if (Array.isArray(validation) && validation.length > 0) {
  //     message += validation.join(' ');
  //   }
  //   if (!validation) {
  //     message = 'Invalid password';
  //   } else {
  //     return null;
  //   }

  //   const error: ValidationErrors = {
  //     password: message,
  //   };
  //   return error;
};
