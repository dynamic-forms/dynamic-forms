import { MockService } from 'ng-mocks';
import { DynamicFormInputMaskNativeDatetimeConverter } from './dynamic-form-input-mask-datetime-converter';
import { DynamicFormInputMaskDatetimeFormatter } from './dynamic-form-input-mask-datetime-formatter';

describe('DynamicFormInputMaskDatetimeConverter', () => {
  describe('DynamicFormInputMaskNativeDatetimeConverter', () => {
    let formatter: DynamicFormInputMaskDatetimeFormatter;
    let converter: DynamicFormInputMaskNativeDatetimeConverter;

    beforeEach(() => {
      formatter = MockService(DynamicFormInputMaskDatetimeFormatter);
      converter = new DynamicFormInputMaskNativeDatetimeConverter(formatter);
    });

    describe('parse', () => {
      it('returns null if date is invalid', () => {
        expect(converter.parse('')).toBeNull();
        expect(converter.parse(null)).toBeNull();
        expect(converter.parse(undefined)).toBeNull();
      });
    });

    describe('format', () => {
      it('returns null if date is null', () => {
        spyOn(formatter, 'format');

        expect(converter.format('')).toBeNull();
        expect(converter.format(null)).toBeNull();
        expect(converter.format(undefined)).toBeNull();
        expect(formatter.format).toHaveBeenCalledTimes(0);
      });

      it('returns formatted date', () => {
        spyOn(formatter, 'format').and.returnValue('2024-01-01 12:00:00');

        const date = new Date(Date.UTC(2024, 0, 1, 12, 0, 0));
        const timezoneOffset = date.getTimezoneOffset();
        const hoursOffset = timezoneOffset / 60;

        expect(converter.format(date)).toEqual('2024-01-01 12:00:00');
        expect(formatter.format).toHaveBeenCalledOnceWith(
          { year: 2024, month: 0, date: 1, hours: 12 - hoursOffset, minutes: 0, seconds: 0 },
          undefined,
        );
      });
    });
  });
});
