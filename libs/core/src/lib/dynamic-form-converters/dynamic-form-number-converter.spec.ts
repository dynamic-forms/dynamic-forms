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
      const normalizeValueSpy = spyOn(converter, 'normalizeValue').and.callThrough();

      expect(converter.parse(17.0)).toBe(17.0);
      expect(normalizeValueSpy).toHaveBeenCalledTimes(0);
    });

    it('returns number parsed as float from normalized string', () => {
      const normalizeValueSpy = spyOn(converter, 'normalizeValue').and.callThrough();

      expect(converter.parse('17.5')).toBe(17.5);
      expect(converter.parse('-17.5')).toBe(-17.5);
      expect(normalizeValueSpy).toHaveBeenCalledWith('17.5', undefined);
      expect(normalizeValueSpy).toHaveBeenCalledWith('-17.5', undefined);
    });

    it('returns number parsed as integer from normalized string', () => {
      const normalizeValueSpy = spyOn(converter, 'normalizeValue').and.callThrough();

      const options = { integer: true };

      expect(converter.parse('17.5', options)).toBe(17);
      expect(converter.parse('-17.5', options)).toBe(-17);
      expect(normalizeValueSpy).toHaveBeenCalledWith('17.5', options);
      expect(normalizeValueSpy).toHaveBeenCalledWith('-17.5', options);
    });

    it('returns null if normalized value is not valid', () => {
      const normalizeValueSpy = spyOn(converter, 'normalizeValue').and.returnValue(null);

      const options = { integer: true };

      expect(converter.parse('123,0')).toBeNull();
      expect(converter.parse('123,0', options)).toBeNull();
      expect(normalizeValueSpy).toHaveBeenCalledWith('123,0', undefined);
      expect(normalizeValueSpy).toHaveBeenCalledWith('123,0', options);
    });
  });

  describe('format', () => {
    it('returns null if number is invalid', () => {
      const parseValueSpy = spyOn(converter, 'parse').and.callThrough();

      const options = { integer: true };

      expect(converter.format(NaN)).toBeNull();
      expect(converter.format(NaN, options)).toBeNull();
      expect(parseValueSpy).toHaveBeenCalledTimes(0);
    });

    it('returns number formatted as float', () => {
      const parseValueSpy = spyOn(converter, 'parse').and.callThrough();

      expect(converter.format(17.5)).toBe('17.5');
      expect(converter.format(-17.5)).toBe('-17.5');
      expect(parseValueSpy).toHaveBeenCalledTimes(0);
    });

    it('returns number formatted as integer', () => {
      const parseValueSpy = spyOn(converter, 'parse').and.callThrough();

      const options = { integer: true };

      expect(converter.format(17.5, options)).toBe('17');
      expect(converter.format(-17.5, options)).toBe('-17');
      expect(parseValueSpy).toHaveBeenCalledTimes(0);
    });

    it('returns number formatted as float after parsing as float', () => {
      const parseValueSpy = spyOn(converter, 'parse').and.callThrough();

      expect(converter.format('17.5')).toBe('17.5');
      expect(converter.format('-17.5')).toBe('-17.5');
      expect(parseValueSpy).toHaveBeenCalledWith('17.5', undefined);
      expect(parseValueSpy).toHaveBeenCalledWith('-17.5', undefined);
    });

    it('returns number formatted as integer after parsing as integer', () => {
      const parseValueSpy = spyOn(converter, 'parse').and.callThrough();

      const options = { integer: true };

      expect(converter.format('17.5', options)).toBe('17');
      expect(converter.format('-17.5', options)).toBe('-17');
      expect(parseValueSpy).toHaveBeenCalledWith('17.5', options);
      expect(parseValueSpy).toHaveBeenCalledWith('-17.5', options);
    });
  });
});
