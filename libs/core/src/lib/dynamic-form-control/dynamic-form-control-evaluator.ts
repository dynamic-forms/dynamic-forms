import { DynamicFormFieldEvaluator } from '../dynamic-form-field/dynamic-form-field-evaluator';
import { DynamicFormFieldEvaluatorFn } from '../dynamic-form-field/dynamic-form-field-evaluator-type';
import { DynamicFormInput } from '../dynamic-form-input/dynamic-form-input';
import { DynamicFormControl } from './dynamic-form-control';

export type DynamicFormControlEvaluatorFn<
  Input extends DynamicFormInput = DynamicFormInput,
  Field extends DynamicFormControl<Input> = DynamicFormControl<Input>
> = DynamicFormFieldEvaluatorFn<Field>;

export class DynamicFormControlEvaluator<
  Input extends DynamicFormInput = DynamicFormInput,
  Field extends DynamicFormControl<Input> = DynamicFormControl<Input>,
  EvaluatorFn extends DynamicFormControlEvaluatorFn<Input, Field> = DynamicFormControlEvaluatorFn<Input, Field>
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
