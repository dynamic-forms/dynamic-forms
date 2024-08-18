import { TestBed, inject } from '@angular/core/testing';
import { importDynamicFormsProviders } from '../dynamic-forms.module';
import {
  DynamicFormDateConverter,
  DynamicFormNativeDateConverter,
  withDynamicFormNativeDateConverter,
} from './dynamic-form-date-converter';

describe('DynamicFormDateConverter', () => {
  describe('DynamicFormNativeDateConverter', () => {
    let converter: DynamicFormNativeDateConverter;

    beforeEach(() => {
      converter = new DynamicFormNativeDateConverter();
    });

    describe('isDateInstance', () => {
      it('returns true if value is date', () => {
        expect(converter.isDateInstance(new Date())).toBeTrue();
      });

      it('returns true if value is invalid date', () => {
        expect(converter.isDateInstance(new Date(NaN))).toBeTrue();
      });

      it('returns false if value is not a date', () => {
        expect(converter.isDateInstance('')).toBeFalse();
        expect(converter.isDateInstance(null)).toBeFalse();
        expect(converter.isDateInstance(undefined)).toBeFalse();
        expect(converter.isDateInstance(0)).toBeFalse();
        expect(converter.isDateInstance('2024-01-01T00:00:00')).toBeFalse();
      });
    });

    describe('isValid', () => {
      it('returns true if value is date', () => {
        expect(converter.isValid(new Date())).toBeTrue();
      });

      it('returns false if value is invalid date', () => {
        expect(converter.isValid(new Date(NaN))).toBeFalse();
        expect(converter.isValid(undefined)).toBeFalse();
        expect(converter.isValid(null)).toBeFalse();
      });
    });

    describe('parse', () => {
      it('returns null if value is not defined', () => {
        expect(converter.parse('')).toBeNull();
        expect(converter.parse(null)).toBeNull();
        expect(converter.parse(undefined)).toBeNull();
      });

      it('returns date parsed from string', () => {
        expect(converter.parse('2024-01-01T00:00:00')).toEqual(new Date(2024, 0, 1, 0, 0, 0));
      });

      it('returns date if value is a Date', () => {
        const date = new Date();

        expect(converter.parse(date)).toBe(date);
      });

      it('returns date from number', () => {
        expect(converter.parse(0)).toEqual(new Date(0));
      });
    });

    describe('format', () => {
      it('returns null if value is not defined', () => {
        expect(converter.format('')).toBeNull();
        expect(converter.format(null)).toBeNull();
        expect(converter.format(undefined)).toBeNull();
      });

      it('returns iso string for date', () => {
        spyOn(converter, 'parse').and.callThrough();

        expect(converter.format(new Date(Date.UTC(2024, 0, 1, 0, 0, 0)))).toBe('2024-01-01T00:00:00.000Z');
        expect(converter.parse).toHaveBeenCalledTimes(0);
      });

      it('returns iso string for date after parse', () => {
        spyOn(converter, 'parse').and.callThrough();

        expect(converter.format('2024-01-01')).toBe('2024-01-01T00:00:00.000Z');
        expect(converter.parse).toHaveBeenCalledTimes(0);
      });
    });

    describe('compare', () => {
      it('returns 0 if dates are equal', () => {
        const date1 = new Date('2024-01-01T00:00:00');
        const date2 = new Date('2024-01-01T00:00:00');

        expect(converter.compare(date1, date2)).toBe(0);
      });

      it('returns number less than 0 if first dates is earlier than second date', () => {
        const date1 = new Date('2024-01-01T00:00:00');
        const date2 = new Date('2024-01-01T00:00:01');

        expect(converter.compare(date1, date2)).toBeLessThan(0);
      });

      it('returns number greater than 0 if first dates is later than second date', () => {
        const date1 = new Date('2024-01-01T00:00:01');
        const date2 = new Date('2024-01-01T00:00:00');

        expect(converter.compare(date1, date2)).toBeGreaterThan(0);
      });
    });
  });

  describe('withDynamicFormNativeDateConverter', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [importDynamicFormsProviders(withDynamicFormNativeDateConverter())],
      });
    });

    it('provides DynamicFormNativeDateConverter', inject([DynamicFormDateConverter], (converter: DynamicFormDateConverter) => {
      expect(converter).toBeInstanceOf(DynamicFormNativeDateConverter);
    }));
  });

  describe('withDynamicFormNativeDateConverter', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: importDynamicFormsProviders(withDynamicFormNativeDateConverter()),
      });
    });

    it('provides DynamicFormNativeDateConverter', inject([DynamicFormDateConverter], (converter: DynamicFormDateConverter) => {
      expect(converter).toBeInstanceOf(DynamicFormNativeDateConverter);
    }));
  });
});
