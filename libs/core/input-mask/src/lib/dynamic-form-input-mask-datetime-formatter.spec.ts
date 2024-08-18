import { DynamicFormInputMaskDatetimeFormatter } from './dynamic-form-input-mask-datetime-formatter';

describe('DynamicFormInputMaskDatetimeFormatter', () => {
  let formatter: DynamicFormInputMaskDatetimeFormatter;

  beforeEach(() => {
    formatter = new DynamicFormInputMaskDatetimeFormatter();
  });

  describe('format', () => {
    const formatsWithLeadingZero = [
      { inputFormat: undefined, expectation: '2024-03-07 06:05:03' },
      { inputFormat: 'yyyy-mm-dd HH:MM:ss', expectation: '2024-03-07 06:05:03' },
      { inputFormat: 'yyyy-mm-dd HH:MM', expectation: '2024-03-07 06:05' },
      { inputFormat: 'yyyy-mm-dd H:MM', expectation: '2024-03-07 6:05' },
      { inputFormat: 'yyyy-mm-dd', expectation: '2024-03-07' },
      { inputFormat: 'dd.mm.yyyy HH:MM:ss', expectation: '07.03.2024 06:05:03' },
      { inputFormat: 'dd.mm.yyyy H:MM', expectation: '07.03.2024 6:05' },
      { inputFormat: 'd.m.yyyy H:MM', expectation: '7.3.2024 6:05' },
      { inputFormat: 'd.m.yy H:MM', expectation: '7.3.24 6:05' },
      { inputFormat: 'd.m.yy', expectation: '7.3.24' },
    ];

    formatsWithLeadingZero.forEach(({ inputFormat, expectation }) => {
      it(`returns ${expectation} for input format ${inputFormat}`, () => {
        const datetimeParts = { year: 2024, month: 2, date: 7, hours: 6, minutes: 5, seconds: 3 };

        expect(formatter.format(datetimeParts, { inputFormat })).toBe(expectation);
      });
    });

    const formatsWithoutLeadingZero = [
      { inputFormat: undefined, expectation: '2024-10-17 18:12:35' },
      { inputFormat: 'yyyy-mm-dd HH:MM:ss', expectation: '2024-10-17 18:12:35' },
      { inputFormat: 'yyyy-mm-dd HH:MM', expectation: '2024-10-17 18:12' },
      { inputFormat: 'yyyy-mm-dd H:MM', expectation: '2024-10-17 18:12' },
      { inputFormat: 'yyyy-mm-dd', expectation: '2024-10-17' },
      { inputFormat: 'dd.mm.yyyy HH:MM:ss', expectation: '17.10.2024 18:12:35' },
      { inputFormat: 'dd.mm.yyyy H:MM', expectation: '17.10.2024 18:12' },
      { inputFormat: 'd.m.yyyy H:MM', expectation: '17.10.2024 18:12' },
      { inputFormat: 'd.m.yy H:MM', expectation: '17.10.24 18:12' },
      { inputFormat: 'd.m.yy', expectation: '17.10.24' },
    ];

    formatsWithoutLeadingZero.forEach(({ inputFormat, expectation }) => {
      it(`returns ${expectation} for input format ${inputFormat}`, () => {
        const datetimeParts = { year: 2024, month: 9, date: 17, hours: 18, minutes: 12, seconds: 35 };

        expect(formatter.format(datetimeParts, { inputFormat })).toBe(expectation);
      });
    });
  });
});
