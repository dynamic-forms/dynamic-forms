import { DynamicFormFieldEvaluator } from '../dynamic-form-field/dynamic-form-field-evaluator';
import { DynamicFormInput } from '../dynamic-form-input/dynamic-form-input';
import { DynamicFormControl } from './dynamic-form-control';

export type DynamicFormControlEvaluator<Input extends DynamicFormInput = DynamicFormInput> =
  DynamicFormFieldEvaluator<DynamicFormControl<Input>>;
