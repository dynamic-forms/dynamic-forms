import { Injectable, Type } from '@angular/core';
import { DynamicFormsFeature } from '../../dynamic-forms-feature';

export abstract class DynamicFormDateConverter<TDate = any> {
  abstract parse(value: any): TDate | null;
  abstract isValid(value: TDate | null): boolean;
  abstract compare(first: TDate, second: TDate): number;
}

@Injectable()
export class DynamicFormNativeDateConverter implements DynamicFormDateConverter<Date> {
  parse(value: any): Date | null {
    if (value instanceof Date) {
      return value;
    }
    if (typeof value === 'number') {
      return new Date(value);
    }
    return value ? new Date(Date.parse(value)) : null;
  }

  isValid(value: Date | null): boolean {
    return value && !isNaN(value.getTime());
  }

  compare(first: Date, second: Date): number {
    return first.getTime() - second.getTime();
  }
}

export function withDynamicFormDateConverter<TDate>(type: Type<DynamicFormDateConverter<TDate>>): DynamicFormsFeature {
  const provider = { provide: DynamicFormDateConverter<TDate>, useClass: type };
  return { providers: [provider] };
}

export function withDynamicFormNativeDateConverter(): DynamicFormsFeature {
  return withDynamicFormDateConverter(DynamicFormNativeDateConverter);
}
