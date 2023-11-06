import { Pipe, PipeTransform } from '@angular/core';
import { getMonthName } from '../utils/monthNames';

@Pipe({
  name: 'numberArrayToMonthArray',
  standalone: true,
})
export class NumberArrayToMonthArrayPipe implements PipeTransform {
  transform(value: number[]) {
    return value.map((month) => getMonthName(month));
  }
}
