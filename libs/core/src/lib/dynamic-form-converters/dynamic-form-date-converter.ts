import { Injectable, Type } from '@angular/core';
import { DynamicFormsFeature } from '../dynamic-forms-feature';
import { DynamicFormConverter } from './dynamic-form-converter';

export abstract class DynamicFormDateConverter<TDate = any, TOptions = any> implements DynamicFormConverter<TDate, TOptions> {
  parse(value: any, options?: TOptions): TDate | null {
    return this.isDateInstance(value) ? value : this.parseDate(value, options);
  }

  format(value: any, options?: TOptions): string | null {
    const date = this.isDateInstance(value) ? (value as TDate) : this.parseDate(value, options);
    return date && this.isValid(date) ? this.formatDate(date, options) : null;
  }

  abstract isDateInstance(value: any): boolean;
  abstract isValid(value: TDate): boolean;
  abstract compare(first: TDate, second: TDate): number;

  protected abstract parseDate(value: any, options?: TOptions): TDate | null;
  protected abstract formatDate(date: TDate, options?: TOptions): string | null;
}

@Injectable()
export class DynamicFormNativeDateConverter<TOptions = any> extends DynamicFormDateConverter<Date, TOptions> {
  isDateInstance(value: any): boolean {
    return value instanceof Date;
  }

  isValid(value: Date): boolean {
    return !!value && !isNaN(value.getTime());
  }

  compare(first: Date, second: Date): number {
    return first.getTime() - second.getTime();
  }

  protected parseDate(value: any, _options?: TOptions): Date | null {
    if (typeof value === 'number') {
      return new Date(value);
    }
    return value ? new Date(Date.parse(value)) : null;
  }

  protected formatDate(date: Date, _options?: TOptions): string | null {
    return date.toISOString();
  }
}

export function withDynamicFormDateConverter<TDate>(type: Type<DynamicFormDateConverter<TDate>>): DynamicFormsFeature {
  const provider = { provide: DynamicFormDateConverter<TDate>, useClass: type };
  return { providers: [provider] };
}

export function withDynamicFormNativeDateConverter(): DynamicFormsFeature {
  return withDynamicFormDateConverter(DynamicFormNativeDateConverter);
}
