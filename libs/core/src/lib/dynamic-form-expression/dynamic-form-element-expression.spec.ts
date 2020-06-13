import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormElementExpression } from './dynamic-form-element-expression';
import { DynamicFormElementExpressionData } from './dynamic-form-element-expression-data';

describe('DynamicFormElementExpression', () => {
  it('get value returns value', () => {
    const values = [];
    const expressionData = <DynamicFormElementExpressionData>{ values };
    const element = <DynamicFormElement>{ expressionData };
    const expression = new DynamicFormElementExpression('key', element, data => {
      return data.values && data.values.length > 0;
    });

    expect(expression.value).toBe(false);

    values.push('value');

    expect(expression.value).toBe(true);
  });
});
