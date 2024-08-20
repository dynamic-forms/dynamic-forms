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

  protected override formatFloat(value: number, options: DynamicFormInputMaskNumberOptions): string {
    const formattedValue = Number.isInteger(options.digits) ? value.toFixed(options.digits) : value.toString();
    return this.formatNumber(formattedValue, options);
  }

  protected override formatInteger(value: number, options: DynamicFormInputMaskNumberOptions): string {
    const formattedValue = value.toFixed(0);
    return this.formatNumber(formattedValue, options);
  }

  private formatNumber(value: string, options: DynamicFormInputMaskNumberOptions): string {
    const prefix = options.prefix || '';
    const suffix = options.alias === 'percentage' ? ' %' : options.suffix || '';
    const radixPoint = options.radixPoint || '.';
    const groupSeparator = options.groupSeparator || '';
    const formattedValue = value.replace('.', radixPoint).replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${groupSeparator}`);
    return `${prefix}${formattedValue}${suffix}`;
  }
}
