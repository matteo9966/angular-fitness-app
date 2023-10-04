import { ValidationErrors } from '@angular/forms';

const errorMap = {
  required: 'This field is required',
  email: 'Invalid email format',
  minlength: (errorObj: any) => {
    const min = errorObj['requiredLength'];
    return 'field min length is ' + min;
  },
  password: (errorObj: any) => {
    return 'Invalid password'
  },
};

export function mapErrorObject(errors: ValidationErrors | null) {
  if (!errors) {
    return '';
  }
  const keys = Object.keys(errors);
  if (keys.length == 0) return '';
  const error = keys[0];
  switch (error) {
    case 'required':
      return errorMap['required'];

    case 'email':
      return errorMap['email'];

    case 'minlength':
      return errorMap['minlength'](errors?.['minlength']);
    case 'password':
      return errorMap['password'](errors?.['password']);

    default:
      return 'invalid field';
  }
}
