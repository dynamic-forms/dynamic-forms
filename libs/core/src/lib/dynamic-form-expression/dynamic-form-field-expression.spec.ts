import { Subject } from 'rxjs';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormExpressionChange } from './dynamic-form-expression-change';
import { DynamicFormFieldExpression } from './dynamic-form-field-expression';

const getCurrencyOptions = (_model, parentModel, _rootModel, memo) => {
  return (function(currencyPair) {
    if (memo.currencyPair === currencyPair) {
      return memo.previousValue;
    }
    memo.currencyPair = currencyPair;
    if (currencyPair) {
      const underlying = currencyPair.substring(0, 3);
      const accounting = currencyPair.substring(4, 7);
      return [
        { value: underlying, label: underlying },
        { value: accounting, label: accounting }
      ];
    }
    return [];
  })(parentModel.currencyPair);
};

class DynamicFormFieldExpressionTesting extends DynamicFormFieldExpression {
  get memo() { return this._memo; }
}

describe('DynamicFormFieldExpression', () => {
  it('get value updates memo and returns current value', () => {
    const expressionChangesSubject = new Subject<DynamicFormExpressionChange>();
    const expressionChanges = expressionChangesSubject.asObservable();
    const field = <DynamicFormField>{
      model: {},
      parent: { model: { currencyPair: 'EUR/USD' } },
      root: { model: {} },
      expressionChangesSubject,
      expressionChanges
    };
    const func = getCurrencyOptions;
    const expression = new DynamicFormFieldExpressionTesting('key', field, func);

    const fieldExpressionChanges = [];
    field.expressionChanges.subscribe(change => {
      fieldExpressionChanges.push(change);
    });

    expect(expression.memo).toEqual({
      previousValue: null,
      currentValue: null
    });

    const expressionValue1 = expression.value;

    expect(expression.memo).toEqual({
      previousValue: null,
      currentValue: expressionValue1,
      currencyPair: 'EUR/USD'
    });
    expect(expressionValue1).toEqual([
      { value: 'EUR', label: 'EUR' },
      { value: 'USD', label: 'USD' }
    ]);

    const expressionValue2 = expression.value;

    expect(expression.memo).toEqual({
      previousValue: expressionValue1,
      currentValue: expressionValue2,
      currencyPair: 'EUR/USD'
    });
    expect(expressionValue2).toBe(expressionValue1);

    field.parent.model.currencyPair = 'EUR/GBP';

    const expressionValue3 = expression.value;

    expect(expression.memo).toEqual({
      previousValue: expressionValue2,
      currentValue: expressionValue3,
      currencyPair: 'EUR/GBP'
    });
    expect(expressionValue3).toEqual([
      { value: 'EUR', label: 'EUR' },
      { value: 'GBP', label: 'GBP' }
    ]);

    field.parent.model.currencyPair = null;

    const expressionValue4 = expression.value;

    expect(expression.memo).toEqual({
      previousValue: expressionValue3,
      currentValue: expressionValue4,
      currencyPair: null
    });
    expect(expressionValue4).toEqual([]);

    expect(fieldExpressionChanges.length).toBe(3);
    expect(fieldExpressionChanges[0].key).toBe('key');
    expect(fieldExpressionChanges[0].previousValue).toBeNull();
    expect(fieldExpressionChanges[0].currentValue).toBe(expressionValue1);
    expect(fieldExpressionChanges[1].key).toBe('key');
    expect(fieldExpressionChanges[1].previousValue).toBe(expressionValue1);
    expect(fieldExpressionChanges[1].currentValue).toBe(expressionValue3);
    expect(fieldExpressionChanges[2].key).toBe('key');
    expect(fieldExpressionChanges[2].previousValue).toBe(expressionValue3);
    expect(fieldExpressionChanges[2].currentValue).toBe(expressionValue4);
  });
});
