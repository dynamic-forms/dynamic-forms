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
