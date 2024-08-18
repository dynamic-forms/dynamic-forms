import { DynamicFormNumberConverter } from './dynamic-form-number-converter';

export class TestDynamicFormNumberConverter extends DynamicFormNumberConverter {
  normalizeValue(value: any, _options?: any): string | null {
    return typeof value === 'string' ? value : null;
  }

  isIntegerExpected(options?: any): boolean {
    return options?.integer ?? false;
  }
}

describe('DynamicFormDateConverter', () => {
  let converter: TestDynamicFormNumberConverter;

  beforeEach(() => {
    converter = new TestDynamicFormNumberConverter();
  });

  describe('parse', () => {
    it('returns number if value is number', () => {
      spyOn(converter, 'normalizeValue').and.callThrough();

      expect(converter.parse(17.0)).toBe(17.0);
      expect(converter.normalizeValue).toHaveBeenCalledTimes(0);
    });

    it('returns number parsed as float from normalized string', () => {
      spyOn(converter, 'normalizeValue').and.callThrough();

      expect(converter.parse('17.5')).toBe(17.5);
      expect(converter.parse('-17.5')).toBe(-17.5);
      expect(converter.normalizeValue).toHaveBeenCalledWith('17.5', undefined);
      expect(converter.normalizeValue).toHaveBeenCalledWith('-17.5', undefined);
    });

    it('returns number parsed as integer from normalized string', () => {
      spyOn(converter, 'normalizeValue').and.callThrough();

      const options = { integer: true };

      expect(converter.parse('17.5', options)).toBe(17);
      expect(converter.parse('-17.5', options)).toBe(-17);
      expect(converter.normalizeValue).toHaveBeenCalledWith('17.5', options);
      expect(converter.normalizeValue).toHaveBeenCalledWith('-17.5', options);
    });

    it('returns null if normalized value is not valid', () => {
      spyOn(converter, 'normalizeValue').and.returnValue(null);

      const options = { integer: true };

      expect(converter.parse('123,0')).toBeNull();
      expect(converter.parse('123,0', options)).toBeNull();
      expect(converter.normalizeValue).toHaveBeenCalledWith('123,0', undefined);
      expect(converter.normalizeValue).toHaveBeenCalledWith('123,0', options);
    });
  });

  describe('format', () => {
    it('returns null if number is invalid', () => {
      spyOn(converter, 'parse').and.callThrough();

      const options = { integer: true };

      expect(converter.format(NaN)).toBeNull();
      expect(converter.format(NaN, options)).toBeNull();
      expect(converter.parse).toHaveBeenCalledTimes(0);
    });

    it('returns number formatted as float', () => {
      spyOn(converter, 'parse').and.callThrough();

      expect(converter.format(17.5)).toBe('17.5');
      expect(converter.format(-17.5)).toBe('-17.5');
      expect(converter.parse).toHaveBeenCalledTimes(0);
    });

    it('returns number formatted as integer', () => {
      spyOn(converter, 'parse').and.callThrough();

      const options = { integer: true };

      expect(converter.format(17.5, options)).toBe('17');
      expect(converter.format(-17.5, options)).toBe('-17');
      expect(converter.parse).toHaveBeenCalledTimes(0);
    });

    it('returns number formatted as float after parsing as float', () => {
      spyOn(converter, 'parse').and.callThrough();

      expect(converter.format('17.5')).toBe('17.5');
      expect(converter.format('-17.5')).toBe('-17.5');
      expect(converter.parse).toHaveBeenCalledWith('17.5', undefined);
      expect(converter.parse).toHaveBeenCalledWith('-17.5', undefined);
    });

    it('returns number formatted as integer after parsing as integer', () => {
      spyOn(converter, 'parse').and.callThrough();

      const options = { integer: true };

      expect(converter.format('17.5', options)).toBe('17');
      expect(converter.format('-17.5', options)).toBe('-17');
      expect(converter.parse).toHaveBeenCalledWith('17.5', options);
      expect(converter.parse).toHaveBeenCalledWith('-17.5', options);
    });
  });
});
