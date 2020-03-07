import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionExpression } from './dynamic-form-action-expression';
import { DynamicFormActionExpressionData } from './dynamic-form-action-expression-data';

describe('DynamicFormActionExpression', () => {
  it('get value returns value', () => {
    const root = { status: 'INVALID' };
    const parent = { status: 'VALID' };
    const expressionData = <DynamicFormActionExpressionData>{ root, parent };
    const action = <DynamicFormAction>{ expressionData };
    const expression = new DynamicFormActionExpression('key', action, data => {
      return data.root.status === 'VALID' && data.parent.status === 'VALID';
    });

    expect(expression.value).toBe(false);

    root.status = 'VALID';

    expect(expression.value).toBe(true);
  });
});
