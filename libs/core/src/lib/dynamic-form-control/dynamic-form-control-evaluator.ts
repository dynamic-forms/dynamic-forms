import { DynamicFormFieldEvaluator } from '../dynamic-form-field/dynamic-form-field-evaluator';
import { DynamicFormFieldEvaluatorFn } from '../dynamic-form-field/dynamic-form-field-evaluator-type';
import { DynamicFormInput } from '../dynamic-form-input/dynamic-form-input';
import { DynamicFormControl } from './dynamic-form-control';

export type DynamicFormControlEvaluatorFn<
  Value = any,
  Input extends DynamicFormInput<Value> = DynamicFormInput<Value>,
  Field extends DynamicFormControl<Value, Input> = DynamicFormControl<Value, Input>
> = DynamicFormFieldEvaluatorFn<Field>;

export class DynamicFormControlEvaluator<
  Value = any,
  Input extends DynamicFormInput<Value> = DynamicFormInput<Value>,
  Field extends DynamicFormControl<Value, Input> = DynamicFormControl<Value, Input>,
  EvaluatorFn extends DynamicFormControlEvaluatorFn<Value, Input, Field> = DynamicFormControlEvaluatorFn<Value, Input, Field>
> extends DynamicFormFieldEvaluator<Field, EvaluatorFn> {

  private _inputType: string;

  constructor(key: string, type: string, inputType: string, field: Field, func: EvaluatorFn) {
    super(key, type, field, func);
    this._inputType = inputType;
  }

  get inputType(): string { return this._inputType; }
  get enabled(): boolean {
    return this.inputType ? this.inputType === this.field.inputType : true;
  }
}
