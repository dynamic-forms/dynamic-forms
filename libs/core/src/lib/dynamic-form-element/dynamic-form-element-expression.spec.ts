import { MockService } from 'ng-mocks';
import { DynamicFormErrorHandler } from '../dynamic-form-error/dynamic-form-error.handler';
import { DynamicFormElement } from './dynamic-form-element';
import { DynamicFormElementExpression } from './dynamic-form-element-expression';
import { DynamicFormElementExpressionData } from './dynamic-form-element-expression-data';

describe('DynamicFormElementExpression', () => {
  let errorHandler: DynamicFormErrorHandler;

  beforeEach(() => {
    errorHandler = MockService(DynamicFormErrorHandler, { handle: () => {} });
  });

  it('get value returns value', () => {
    const values = [];
    const expressionData = {
      root: null,
      parent: null,
      parentField: null,
      id: undefined,
      hidden: false,
      values,
    } as DynamicFormElementExpressionData;
    const element = { expressionData } as DynamicFormElement;
    const expression = new DynamicFormElementExpression('key', element, data => data.values && data.values.length > 0, errorHandler);

    expect(expression.value).toBe(false);

    values.push('value');

    expect(expression.value).toBe(true);
  });
});
