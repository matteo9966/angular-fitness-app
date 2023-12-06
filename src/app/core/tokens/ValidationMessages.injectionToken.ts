import { InjectionToken } from '@angular/core';
import { ValidationMessages } from '../models/ValidationMessages.interface';

export const VALIDATION_MESSAGES = new InjectionToken<ValidationMessages[]>(
  'Validation_Messages'
);
