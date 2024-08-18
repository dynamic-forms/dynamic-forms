import { Injectable } from '@angular/core';
import { DynamicFormInputMaskDatetimeOptions } from './dynamic-form-input-mask';

export interface DatetimeParts {
  year: number;
  month: number;
  date: number;
  hours: number;
  minutes: number;
  seconds: number;
}

@Injectable()
export class DynamicFormInputMaskDatetimeFormatter {
  format(datetimeParts: DatetimeParts, options?: DynamicFormInputMaskDatetimeOptions): string {
    const format = options?.inputFormat || 'yyyy-mm-dd HH:MM:ss';
    const parts = {
      yy: datetimeParts.year % 100,
      yyyy: datetimeParts.year,
      m: datetimeParts.month + 1,
      mm: this.padZero(datetimeParts.month + 1),
      d: datetimeParts.date,
      dd: this.padZero(datetimeParts.date),
      H: datetimeParts.hours,
      HH: this.padZero(datetimeParts.hours),
      h: datetimeParts.hours > 12 ? datetimeParts.hours - 12 : datetimeParts.hours,
      hh: this.padZero(datetimeParts.hours > 12 ? datetimeParts.hours - 12 : datetimeParts.hours),
      MM: this.padZero(datetimeParts.minutes),
      ss: this.padZero(datetimeParts.seconds),
      t: datetimeParts.hours < 12 ? 'a' : 'p',
      tt: datetimeParts.hours < 12 ? 'am' : 'pm',
      T: datetimeParts.hours < 12 ? 'A' : 'P',
      TT: datetimeParts.hours < 12 ? 'AM' : 'PM',
    };

    return format.replace(/yyyy|yy|mm|m|dd|d|HH|H|hh|h|MM|ss|TT|T|tt|t/g, match => parts[match]);
  }

  private padZero(number: number): string {
    return number < 10 ? `0${number}` : `${number}`;
  }
}
