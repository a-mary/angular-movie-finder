import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'minToHrAndMin'
})
export class MinToHrAndMinPipe implements PipeTransform {

  transform(value: number): string {
    const mins = value % 60;
    const hours = Math.floor(value / 60);
    if (value < 60) {
      return value + 'm';
    } else if (mins === 0) {
      return hours + 'h';
    } else {
      return hours + 'h ' + mins + 'm';
    }
  }
}
