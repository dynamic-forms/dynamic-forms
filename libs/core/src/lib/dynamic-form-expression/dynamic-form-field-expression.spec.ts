import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldExpression } from './dynamic-form-field-expression';

function getCurrencyOptions(model, parentModel, rootModel, memo) {
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
}

class DynamicFormFieldExpressionTesting extends DynamicFormFieldExpression {
  get memo() { return this._memo; }
}

describe('DynamicFormFieldExpression', () => {
  it('get value updates memo and returns current value', () => {
    const field = <DynamicFormField>{
      model: {},
      parent: { model: { currencyPair: 'EUR/USD' } },
      root: { model: {} }
    };
    const expression = new DynamicFormFieldExpressionTesting([], getCurrencyOptions, field);

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
  });
});
