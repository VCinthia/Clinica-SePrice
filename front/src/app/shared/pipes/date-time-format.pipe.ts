import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTimeFormat',
  standalone: true
})
export class DateTimeFormatPipe implements PipeTransform {
  
  constructor(private datePipe: DatePipe) {}

  transform(value: string): string {
    if (!value) return '';

    const [date, time] = value.split('T');
    const formattedDate = this.datePipe.transform(date, 'dd/MM/yyyy');
    const formattedTime = this.datePipe.transform(time, 'HH:mm');

    return `${formattedDate} ${formattedTime}`;
  }
}
