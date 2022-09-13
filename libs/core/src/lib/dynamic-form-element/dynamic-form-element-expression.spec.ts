import { DynamicFormLogger } from '../dynamic-form-logging/dynamic-form.logger';
import { DynamicFormElement } from './dynamic-form-element';
import { DynamicFormElementExpression } from './dynamic-form-element-expression';
import { DynamicFormElementExpressionData } from './dynamic-form-element-expression-data';

describe('DynamicFormElementExpression', () => {
  let logger: DynamicFormLogger;

  beforeEach(() => {
    logger = { error: () => {} } as any;
  });

  it('get value returns value', () => {
    const values = [];
    const expressionData = { root: null, parent: null, parentField: null, values } as DynamicFormElementExpressionData;
    const element = { expressionData } as DynamicFormElement;
    const expression = new DynamicFormElementExpression('key', element, data => data.values && data.values.length > 0, logger);

    expect(expression.value).toBe(false);

    values.push('value');

    expect(expression.value).toBe(true);
  });
});
