import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionExpression } from './dynamic-form-action-expression';

describe('DynamicFormActionExpression', () => {
  it('get value returns value', () => {
    const root = { status: 'INVALID' };
    const parent = { status: 'VALID' };
    const action = <DynamicFormAction>{ root, parent };
    const expression = new DynamicFormActionExpression('key', action, (parentStatus, rootStatus) => {
      return parentStatus === 'VALID' && rootStatus === 'VALID';
    });

    expect(expression.value).toBe(false);

    root.status = 'VALID';

    expect(expression.value).toBe(true);
  });
});
