import { DynamicFormControl } from './dynamic-form-control';
import { DynamicFormControlEvaluator } from './dynamic-form-control-evaluator';

describe('DynamicFormControlEvaluator', () => {
  it('creates instance', () => {
    const control = {} as DynamicFormControl;
    const func = (_: DynamicFormControl) => {};
    const evaluator = new DynamicFormControlEvaluator('key', 'type', 'inputType', control, func);

    expect(evaluator.key).toBe('key');
    expect(evaluator.type).toBe('type');
    expect(evaluator.inputType).toBe('inputType');
    expect(evaluator.field).toBe(control);
    expect(evaluator.func).toBe(func);
    expect(evaluator.enabled).toBeFalse();
  });

  it('enabled returns true if input type equals input type of control', () => {
    const control = { inputType: 'inputType' } as DynamicFormControl;
    const evaluator = new DynamicFormControlEvaluator('key', 'type', 'inputType', control, null);

    expect(evaluator.enabled).toBeTrue();
  });

  it('enabled returns true if input type is undefined', () => {
    const control = {} as DynamicFormControl;
    const evaluator = new DynamicFormControlEvaluator('key', 'type', undefined, control, null);

    expect(evaluator.enabled).toBeTrue();
  });
});
