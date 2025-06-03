import { TestBed } from '@angular/core/testing';
import { DynamicFormInputMaskDatetimeFormatter } from '@dynamic-forms/core/input-mask';
import { provideNativeDatetimeAdapter } from '@dynamic-forms/material';
import { MatDynamicFormInputMaskDatetimeConverter } from './dynamic-form-input-mask-datetime-converter';

describe('MatDynamicFormInputMaskDatetimeConverter', () => {
  let converter: MatDynamicFormInputMaskDatetimeConverter<Date>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...provideNativeDatetimeAdapter(), DynamicFormInputMaskDatetimeFormatter, MatDynamicFormInputMaskDatetimeConverter],
    });
    converter = TestBed.inject(MatDynamicFormInputMaskDatetimeConverter<Date>);
  });

  describe('isDateInstance', () => {
    it('returns true if value is date instance', () => {
      const date = new Date();
      expect(converter.isDateInstance(date)).toBe(true);
    });

    it('returns false if value is not date instance', () => {
      expect(converter.isDateInstance('')).toBe(false);
    });
  });

  describe('isValid', () => {
    it('returns true if value is valid date', () => {
      const date = new Date();
      expect(converter.isValid(date)).toBe(true);
    });

    it('returns false if value is invalid date', () => {
      expect(converter.isValid(new Date(''))).toBe(false);
    });
  });

  describe('compare', () => {
    it('returns zero if dates are equal', () => {
      const date1 = new Date(2021, 1, 1, 1, 1, 1);
      const date2 = new Date(2021, 1, 1, 1, 1, 1);
      expect(converter.compare(date1, date2)).toBe(0);
    });

    it('returns negative value', () => {
      const date1 = new Date(2021, 1, 1, 1, 1, 1);
      const date2 = new Date(2021, 1, 1, 1, 1, 2);
      expect(converter.compare(date1, date2)).toBe(-1);
    });

    it('returns postive value', () => {
      const date1 = new Date(2021, 1, 1, 1, 1, 2);
      const date2 = new Date(2021, 1, 1, 1, 1, 1);
      expect(converter.compare(date1, date2)).toBe(1);
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

    it('returns formatted date using default format', () => {
      const converterParse = spyOn(converter, 'parse').and.callThrough();

      const date = new Date(Date.UTC(2024, 0, 1, 12, 0, 0));
      const timezoneOffset = date.getTimezoneOffset();
      const hoursOffset = timezoneOffset / 60;
      const hours = 12 - hoursOffset;

      expect(converter.format(date)).toBe(`2024-01-01 ${hours}:00:00`);
      expect(converterParse).toHaveBeenCalledTimes(0);
    });

    it('returns formatted date using provided input format', () => {
      const converterParse = spyOn(converter, 'parse').and.callThrough();

      const date = new Date(Date.UTC(2024, 0, 1, 12, 0, 0));
      const timezoneOffset = date.getTimezoneOffset();
      const hoursOffset = timezoneOffset / 60;
      const hours = 12 - hoursOffset;

      expect(converter.format(date, { inputFormat: 'dd.mm.yyyy HH:MM:ss' })).toBe(`01.01.2024 ${hours}:00:00`);
      expect(converterParse).toHaveBeenCalledTimes(0);
    });
  });
});
