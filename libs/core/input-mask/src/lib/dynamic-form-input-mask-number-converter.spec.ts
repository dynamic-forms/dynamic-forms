import { DynamicFormInputMaskNumberConverter } from './dynamic-form-input-mask-number-converter';

describe('DynamicFormInputMaskNumberConverter', () => {
  let converter: DynamicFormInputMaskNumberConverter;

  beforeEach(() => {
    converter = new DynamicFormInputMaskNumberConverter();
  });

  describe('parse', () => {
    it('returns null if value is not number', () => {
      const options = { prefix: '$', suffix: '', groupSeparator: '.', radixPoint: ',' };

      expect(converter.parse('', options)).toBeNull();
      expect(converter.parse(null, options)).toBeNull();
      expect(converter.parse(undefined, options)).toBeNull();
    });

    it('returns number as float', () => {
      const options = { prefix: '$', suffix: '', groupSeparator: '.', radixPoint: ',' };

      expect(converter.parse('10.000,50$', options)).toBe(10000.5);
    });

    it('returns number as integer if alias is integer', () => {
      const options = { alias: 'integer', prefix: '$', suffix: '', groupSeparator: '.', radixPoint: ',' };

      expect(converter.parse('10.000,50$', options)).toBe(10000);
    });

    it('returns number as integer if digits is set to zero', () => {
      const options = { digits: 0, prefix: '$', suffix: '', groupSeparator: '.', radixPoint: ',' };

      expect(converter.parse('10.000,50$', options)).toBe(10000);
    });
  });
});
