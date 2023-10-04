import {
  FormControl,
  ValidatorFn,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';

export const validatePassword: (config: Config) => ValidatorFn =
  (config) => (control: AbstractControl) => {
    const validationErrors =  validate(control.value, config);
    if(validationErrors.length==0){
      return null
    }
    return { password: validate(control.value, config) };
  
  };

type Config = {
  uppercase?: number;
  lowercase?: number;
  symbol?: number;
  nospaces?: boolean;
};

export function validate(value: string, config: Config) {
  const errors = [];
  if (config.lowercase && config.lowercase > 0) {
    const count = lowercaseCount(value);
    if (count < config.lowercase) {
      errors.push('lowercase');
    }
  }
  if (config.nospaces) {
    const nospaces = noSpaces(value);
    if (nospaces) {
      errors.push('nospaces');
    }
  }
  if (config.symbol) {
    const count = symbolCount(value);
    if (count < config.symbol) {
      errors.push('symbol');
    }
  }
  if (config.uppercase) {
    const count = uppercaseCount(value);
    if (count < config.uppercase) {
      errors.push('uppercase');
    }
  }
  return errors;
}

function uppercaseCount(value: string) {
  const count = value.match(/[A-Z]/g)?.length;
  if (!count) return 0;
  return count;
}

function lowercaseCount(value: string) {
  const count = value.match(/[a-z]/g)?.length;
  if (!count) return 0;
  return count;
}

function symbolCount(value: string) {
  const count = value.match(/[^a-zA-Z0-9\s]/g)?.length;
  if (!count) return 0;
  return count;
}

function noSpaces(value: string) {
  const count = value.match(/[\s]/g)?.length;
  if (count) return true;
  return false;
}
