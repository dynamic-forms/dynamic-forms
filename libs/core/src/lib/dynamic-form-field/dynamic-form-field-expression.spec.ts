import { Subject } from 'rxjs';
import { DynamicFormExpressionChange } from '../dynamic-form-expression/dynamic-form-expression-change';
import { DynamicFormExpressionMemoization } from '../dynamic-form-expression/dynamic-form-expression-memoization';
import { DynamicFormLogger } from '../dynamic-form-logging/dynamic-form.logger';
import { DynamicFormField } from './dynamic-form-field';
import { DynamicFormFieldExpression } from './dynamic-form-field-expression';

const getCurrencyOptions = (data, memo) => ((currencyPair: string): any[] => {
  if (memo.currencyPair === currencyPair) {
    return memo.previousValue;
  }
  memo.currencyPair = currencyPair;
  if (currencyPair) {
    const underlying = currencyPair.substring(0, 3);
    const accounting = currencyPair.substring(4, 7);
    return [
      { value: underlying, label: underlying },
      { value: accounting, label: accounting },
    ];
  }
  return [];
})(data.parentField.model.currencyPair);

class DynamicFormFieldExpressionTesting extends DynamicFormFieldExpression {
  get memo(): DynamicFormExpressionMemoization { return this._memo; }
}

describe('DynamicFormFieldExpression', () => {
  let logger: DynamicFormLogger;

  beforeEach(() => {
    logger = { error: () => {} } as any;
  });

  it('get value updates memo and returns current value', () => {
    const expressionChangesSubject = new Subject<DynamicFormExpressionChange>();
    const expressionChanges = expressionChangesSubject.asObservable();
    const field = {
      expressionData: {
        root: {},
        parent: {},
        parentField: { model: { currencyPair: 'EUR/USD' } },
        model: {},
      },
      expressionChangesSubject,
      expressionChanges,
    } as DynamicFormField;
    const func = getCurrencyOptions;
    const expression = new DynamicFormFieldExpressionTesting('key', field, func, logger);

    const fieldExpressionChanges = [];
    field.expressionChanges.subscribe({
      next: (change) => fieldExpressionChanges.push(change),
    });

    expect(expression.memo).toEqual({
      previousValue: undefined,
      currentValue: undefined,
    });

    const expressionValue1 = expression.value;

    expect(expression.memo).toEqual({
      previousValue: undefined,
      currentValue: expressionValue1,
      currencyPair: 'EUR/USD',
    });
    expect(expressionValue1).toEqual([
      { value: 'EUR', label: 'EUR' },
      { value: 'USD', label: 'USD' },
    ]);

    const expressionValue2 = expression.value;

    expect(expression.memo).toEqual({
      previousValue: expressionValue1,
      currentValue: expressionValue2,
      currencyPair: 'EUR/USD',
    });
    expect(expressionValue2).toBe(expressionValue1);

    field.expressionData.parentField.model.currencyPair = 'EUR/GBP';

    const expressionValue3 = expression.value;

    expect(expression.memo).toEqual({
      previousValue: expressionValue2,
      currentValue: expressionValue3,
      currencyPair: 'EUR/GBP',
    });
    expect(expressionValue3).toEqual([
      { value: 'EUR', label: 'EUR' },
      { value: 'GBP', label: 'GBP' },
    ]);

    field.expressionData.parentField.model.currencyPair = null;

    const expressionValue4 = expression.value;

    expect(expression.memo).toEqual({
      previousValue: expressionValue3,
      currentValue: expressionValue4,
      currencyPair: null,
    });
    expect(expressionValue4).toEqual([]);

    expect(fieldExpressionChanges.length).toBe(3);
    expect(fieldExpressionChanges[0].key).toBe('key');
    expect(fieldExpressionChanges[0].previousValue).toBeUndefined();
    expect(fieldExpressionChanges[0].currentValue).toBe(expressionValue1);
    expect(fieldExpressionChanges[1].key).toBe('key');
    expect(fieldExpressionChanges[1].previousValue).toBe(expressionValue1);
    expect(fieldExpressionChanges[1].currentValue).toBe(expressionValue3);
    expect(fieldExpressionChanges[2].key).toBe('key');
    expect(fieldExpressionChanges[2].previousValue).toBe(expressionValue3);
    expect(fieldExpressionChanges[2].currentValue).toBe(expressionValue4);
  });

  it('get value does not throw exception', () => {
    const expressionChangesSubject = new Subject<DynamicFormExpressionChange>();
    const expressionChanges = expressionChangesSubject.asObservable();
    const field = {
      expressionData: {
        root: null,
        parent: null,
        parentField: { model: { currencyPair: 'EUR/USD' } },
        model: null,
      },
      expressionChangesSubject,
      expressionChanges,
    } as DynamicFormField;
    const func = getCurrencyOptions;
    const expression = new DynamicFormFieldExpressionTesting('key', field, func, logger);

    expect(() => expression.value).not.toThrow();
  });

  it('get value catches and logs exception', () => {
    spyOn(logger, 'error');

    const expressionChangesSubject = new Subject<DynamicFormExpressionChange>();
    const expressionChanges = expressionChangesSubject.asObservable();
    const field = {
      expressionData: {
        root: null,
        parent: null,
        parentField: null,
        model: null,
      },
      expressionChangesSubject,
      expressionChanges,
    } as DynamicFormField;
    const func = getCurrencyOptions;
    const expression = new DynamicFormFieldExpressionTesting('key', field, func, logger);

    expect(expression.value).toBeUndefined();
    expect(logger.error).toHaveBeenCalled();
  });
});
