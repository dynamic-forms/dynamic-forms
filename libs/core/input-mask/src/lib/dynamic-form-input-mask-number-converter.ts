import { Injectable } from '@angular/core';
import { DynamicFormNumberConverter } from '@dynamic-forms/core';
import { DynamicFormInputMaskNumberOptions } from './dynamic-form-input-mask';

@Injectable()
export class DynamicFormInputMaskNumberConverter
  extends DynamicFormNumberConverter<DynamicFormInputMaskNumberOptions>
  implements DynamicFormInputMaskNumberConverter
{
  protected isIntegerExpected(options: DynamicFormInputMaskNumberOptions): boolean {
    return options.digits === 0 || options.alias === 'integer';
  }

  protected normalizeValue(value: any, options: DynamicFormInputMaskNumberOptions): string | null {
    if (typeof value !== 'string') {
      return null;
    }

    return value
      .replace(options.prefix, '')
      .replace(options.suffix, '')
      .replace(options.groupSeparator, '')
      .replace(options.radixPoint, '.');
  }
}
