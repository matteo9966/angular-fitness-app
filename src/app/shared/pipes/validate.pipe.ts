import { inject, Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ValidationMessages } from 'src/app/core/models/ValidationMessages.interface';
import { VALIDATION_MESSAGES } from 'src/app/core/tokens/ValidationMessages.injectionToken';
@Pipe({
  name: 'validate',
  standalone: true,
})
export class ValidatePipe implements PipeTransform {
  validationMessages: ValidationMessages[] = inject(VALIDATION_MESSAGES);
  validationMessagesMap: Record<string, (args: any) => string> = {};
  constructor() {
    this.validationMessagesMap = this.validationMessages.reduce(
      (curr, validationMessages) => {
        return { ...curr, ...validationMessages };
      },
      {}
    );
  }
  transform(value: ValidationErrors | null): string | null {
    if (!value) {
      return null;
    }
    const [[firstErrorKey, firstErrorValue]] = Object.entries(value); //destructuring the first error
    const template = this.validationMessagesMap[firstErrorKey];
    if (!template) return 'Invalid field!';
    return template(firstErrorValue);
  }
}
