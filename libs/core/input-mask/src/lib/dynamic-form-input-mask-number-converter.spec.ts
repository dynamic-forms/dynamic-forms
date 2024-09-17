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

  describe('format', () => {
    it('returns null if value is not number', () => {
      const options = { prefix: '$', suffix: '', groupSeparator: '.', radixPoint: ',' };

      expect(converter.format('', options)).toBeNull();
      expect(converter.format(null, options)).toBeNull();
      expect(converter.format(undefined, options)).toBeNull();
    });

    it('returns number as formatted float', () => {
      const options1 = {};
      const options2 = { groupSeparator: '.', radixPoint: ',' };
      const options3 = { digits: 2, groupSeparator: '.', radixPoint: ',' };

      expect(converter.format(10000.525, options1)).toBe('10000.525');
      expect(converter.format(10000.525, options2)).toBe('10.000,525');
      expect(converter.format(10000.525, options3)).toBe('10.000,52');
    });

    it('returns number as formatted currency', () => {
      const options1 = { prefix: '$' };
      const options2 = { groupSeparator: '.', radixPoint: ',', prefix: '$' };
      const options3 = { digits: 2, groupSeparator: '.', radixPoint: ',', prefix: '$' };

      expect(converter.format(10000.525, options1)).toBe('$10000.525');
      expect(converter.format(10000.525, options2)).toBe('$10.000,525');
      expect(converter.format(10000.525, options3)).toBe('$10.000,52');
    });

    it('returns number as formatted integer', () => {
      const options1 = { alias: 'integer' };
      const options2 = { alias: 'integer', groupSeparator: '.', radixPoint: ',' };
      const options3 = { digits: 0, groupSeparator: '.', radixPoint: ',' };

      expect(converter.format(10000, options1)).toBe('10000');
      expect(converter.format(10000, options2)).toBe('10.000');
      expect(converter.format(10000, options3)).toBe('10.000');
    });

    it('returns number as formatted percentage ', () => {
      const options1 = { alias: 'percentage', digits: 0 };
      const options2 = { alias: 'integer', suffix: ' %' };
      const options3 = { digits: 0, suffix: ' %' };

      expect(converter.format(100, options1)).toBe('100 %');
      expect(converter.format(100, options2)).toBe('100 %');
      expect(converter.format(100, options3)).toBe('100 %');
    });
  });
});
