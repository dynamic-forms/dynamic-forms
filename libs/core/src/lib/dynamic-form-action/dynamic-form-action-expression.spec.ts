import { DynamicFormLogger } from '../dynamic-form-logging/dynamic-form.logger';
import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormActionExpression } from './dynamic-form-action-expression';
import { DynamicFormActionExpressionData } from './dynamic-form-action-expression-data';

describe('DynamicFormActionExpression', () => {
  let logger: DynamicFormLogger;

  beforeEach(() => {
    logger = { error: () => {} } as any;
  });

  it('get value returns value', () => {
    const root = { status: 'INVALID' };
    const parent = null;
    const parentField = { status: 'VALID' };
    const expressionData = { root, parent, parentField } as DynamicFormActionExpressionData;
    const action = { expressionData } as DynamicFormAction;
    const func = data => data.root.status === 'VALID' && data.parentField.status === 'VALID';
    const expression = new DynamicFormActionExpression('key', action, func, logger);

    expect(expression.value).toBe(false);

    root.status = 'VALID';

    expect(expression.value).toBe(true);
  });
});
