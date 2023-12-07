import { Pipe, PipeTransform } from '@angular/core';
import { FormControlStatus } from '@angular/forms';

@Pipe({
  name: 'statusChanges',
  standalone: true,
})
export class StatusChangesPipe implements PipeTransform {
  transform(value: FormControlStatus | null): string {
    switch (value) {
      case 'PENDING':
        return 'Pending validation';
      default:
        return '';
    }
  }
}
