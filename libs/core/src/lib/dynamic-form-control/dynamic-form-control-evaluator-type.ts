import { DynamicFormFieldEvaluatorType } from '../dynamic-form-field/dynamic-form-field-evaluator';
import { DynamicFormInput } from '../dynamic-form-input/dynamic-form-input';
import { DynamicFormControl } from './dynamic-form-control';

export interface DynamicFormControlEvaluatorType<Input extends DynamicFormInput = DynamicFormInput>
  extends DynamicFormFieldEvaluatorType<DynamicFormControl<Input>> {}
