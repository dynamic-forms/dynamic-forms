import { DynamicFormConverter } from './dynamic-form-converter';

export abstract class DynamicFormNumberConverter<TOptions = any> implements DynamicFormConverter<number, TOptions> {
  parse(value: any, options?: TOptions): number | null {
    if (typeof value === 'number') {
      return value;
    }

    const normalizedValue = this.normalizeValue(value, options);
    if (!normalizedValue) {
      return null;
    }

    return this.isIntegerExpected(options) ? this.parseInteger(normalizedValue) : this.parseFloat(normalizedValue);
  }

  format(value: any, options?: TOptions): string | null {
    const number = typeof value !== 'number' ? this.parse(value, options) : value;
    if (!this.isValid(number)) {
      return null;
    }
    return this.isIntegerExpected(options) ? this.formatInteger(number, options) : this.formatFloat(number, options);
  }

  isValid(value: number): boolean {
    return Number.isFinite(value);
  }

  protected abstract normalizeValue(value: any, options?: TOptions): string | null;
  protected abstract isIntegerExpected(options?: TOptions): boolean;

  protected parseFloat(normalizedValue: string): number {
    return Number.parseFloat(normalizedValue);
  }

  protected parseInteger(normalizedValue: string): number {
    return Number.parseInt(normalizedValue);
  }

  protected formatFloat(value: number, _options?: TOptions): string {
    return value.toString();
  }

  protected formatInteger(value: number, _options?: TOptions): string {
    return Math.trunc(value).toString();
  }
}
