import { DynamicFormFieldTemplate } from '../dynamic-form-field/dynamic-form-field-template';
import { DynamicFormControlInput } from './dynamic-form-control-input';
import { DynamicFormControlValidation } from './dynamic-form-control-validation';

export interface DynamicFormControlTemplate<
  Input extends DynamicFormControlInput = DynamicFormControlInput
> extends DynamicFormFieldTemplate {
  input: Input;
  validation: DynamicFormControlValidation;
}
