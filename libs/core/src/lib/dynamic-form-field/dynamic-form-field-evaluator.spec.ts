import { DynamicFormField } from './dynamic-form-field';
import { DynamicFormFieldEvaluator } from './dynamic-form-field-evaluator';
import { DynamicFormFieldEvaluatorFn } from './dynamic-form-field-evaluator-type';

class TestDynamicFormFieldEvaluator extends DynamicFormFieldEvaluator {
  readonly enabled = false;

  constructor(key: string, type: string, field: DynamicFormField, func: DynamicFormFieldEvaluatorFn) {
    super(key, type, field, func);
  }
}

describe('DynamicFormFieldEvaluator', () => {
  it('creates instance', () => {
    const field = {} as DynamicFormField;
    const func = (_: DynamicFormField) => {};
    const evaluator = new TestDynamicFormFieldEvaluator('key', 'type', field, func);

    expect(evaluator.key).toBe('key');
    expect(evaluator.type).toBe('type');
    expect(evaluator.field).toBe(field);
    expect(evaluator.func).toBe(func);
    expect(evaluator.enabled).toBe(false);
  });
});
