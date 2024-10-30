import { Injectable, Provider } from '@angular/core';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';

export abstract class DatetimeAdapter<TDatetime, TLocale = any> extends DateAdapter<TDatetime, TLocale> {
  abstract override getHours(date: TDatetime): number;
  abstract override getMinutes(date: TDatetime): number;
  abstract override getSeconds(date: TDatetime): number;
}

@Injectable()
export class NativeDatetimeAdapter extends NativeDateAdapter implements DatetimeAdapter<Date> {
  override getHours(date: Date): number {
    return date.getHours();
  }

  override getMinutes(date: Date): number {
    return date.getMinutes();
  }

  override getSeconds(date: Date): number {
    return date.getSeconds();
  }

  override compareDate(first: Date, second: Date): number {
    return (
      this.getYear(first) - this.getYear(second) ||
      this.getMonth(first) - this.getMonth(second) ||
      this.getDate(first) - this.getDate(second) ||
      this.getHours(first) - this.getHours(second) ||
      this.getMinutes(first) - this.getMinutes(second) ||
      this.getSeconds(first) - this.getSeconds(second)
    );
  }
}

export function provideNativeDatetimeAdapter(): Provider[] {
  return [{ provide: DatetimeAdapter, useClass: NativeDatetimeAdapter }];
}
