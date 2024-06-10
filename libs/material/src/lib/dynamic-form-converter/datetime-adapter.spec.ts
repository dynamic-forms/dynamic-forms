import { TestBed } from '@angular/core/testing';
import { DatetimeAdapter, NativeDatetimeAdapter, provideNativeDatetimeAdapter } from './datetime-adapter';

describe('DatetimeAdapter', () => {
  let adapter: DatetimeAdapter<Date>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: provideNativeDatetimeAdapter(),
    });
    adapter = TestBed.inject(DatetimeAdapter);
  });

  it('is instance of NativeDatetimeAdapter', () => {
    expect(adapter).toBeInstanceOf(NativeDatetimeAdapter);
  });

  describe('compareDate', () => {
    it('returns zero if dates are equal', () => {
      const date1 = new Date(2021, 1, 1, 1, 1, 1);
      const date2 = new Date(2021, 1, 1, 1, 1, 1);
      expect(adapter.compareDate(date1, date2)).toBe(0);
    });

    it('returns negative value', () => {
      const date1 = new Date(2021, 1, 1, 1, 1, 1);
      const date2 = new Date(2021, 1, 1, 1, 1, 2);
      expect(adapter.compareDate(date1, date2)).toBe(-1);
    });

    it('returns postive value', () => {
      const date1 = new Date(2021, 1, 1, 1, 1, 2);
      const date2 = new Date(2021, 1, 1, 1, 1, 1);
      expect(adapter.compareDate(date1, date2)).toBe(1);
    });
  });
});
