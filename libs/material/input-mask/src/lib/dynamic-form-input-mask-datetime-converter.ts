import { Injectable } from '@angular/core';
import { DynamicFormDateConverter } from '@dynamic-forms/core';
import {
  DynamicFormInputMaskDatetimeConverter,
  DynamicFormInputMaskDatetimeFormatter,
  DynamicFormInputMaskDatetimeOptions,
} from '@dynamic-forms/core/input-mask';
import { DatetimeAdapter } from '@dynamic-forms/material';

@Injectable()
export class MatDynamicFormInputMaskDatetimeConverter<TDate = any>
  extends DynamicFormDateConverter<TDate, DynamicFormInputMaskDatetimeOptions>
  implements DynamicFormInputMaskDatetimeConverter<TDate>
{
  constructor(
    private readonly datetimeAdapter: DatetimeAdapter<TDate>,
    private readonly datetimeFormatter: DynamicFormInputMaskDatetimeFormatter,
  ) {
    super();
  }

  isDateInstance(value: any): boolean {
    return this.datetimeAdapter.isDateInstance(value);
  }

  isValid(value: TDate): boolean {
    return this.datetimeAdapter.isValid(value);
  }

  compare(first: TDate, second: TDate): number {
    return this.datetimeAdapter.compareDate(first, second);
  }

  protected parseDate(value: any, options: DynamicFormInputMaskDatetimeOptions): TDate | null {
    return this.datetimeAdapter.parse(value, options);
  }

  protected formatDate(date: TDate, options: DynamicFormInputMaskDatetimeOptions): string | null {
    const datetimeParts = {
      year: this.datetimeAdapter.getYear(date),
      month: this.datetimeAdapter.getMonth(date),
      date: this.datetimeAdapter.getDate(date),
      hours: this.datetimeAdapter.getHours(date),
      minutes: this.datetimeAdapter.getMinutes(date),
      seconds: this.datetimeAdapter.getSeconds(date),
    };
    return this.datetimeFormatter.format(datetimeParts, options);
  }
}
