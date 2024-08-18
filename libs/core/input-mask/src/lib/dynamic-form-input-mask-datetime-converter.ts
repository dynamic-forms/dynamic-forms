import { Injectable } from '@angular/core';
import { DynamicFormNativeDateConverter } from '@dynamic-forms/core';
import { DynamicFormInputMaskDatetimeOptions } from './dynamic-form-input-mask';
import { DynamicFormInputMaskConverter } from './dynamic-form-input-mask-converter';
import { DynamicFormInputMaskDatetimeFormatter } from './dynamic-form-input-mask-datetime-formatter';

export type DynamicFormInputMaskDatetimeConverter<TDate = any> = DynamicFormInputMaskConverter<TDate, DynamicFormInputMaskDatetimeOptions>;

@Injectable()
export class DynamicFormInputMaskNativeDatetimeConverter
  extends DynamicFormNativeDateConverter<DynamicFormInputMaskDatetimeOptions>
  implements DynamicFormInputMaskDatetimeConverter<Date>
{
  constructor(private readonly datetimeFormatter: DynamicFormInputMaskDatetimeFormatter) {
    super();
  }

  protected override formatDate(date: Date, options: DynamicFormInputMaskDatetimeOptions): string {
    const datetimeParts = {
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
    };
    return this.datetimeFormatter.format(datetimeParts, options);
  }
}
