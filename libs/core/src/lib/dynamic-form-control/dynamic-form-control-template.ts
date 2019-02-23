import { DynamicFormFieldTemplate } from '../dynamic-form-field/dynamic-form-field-template';
import { FormControlInput } from './form-control-input';
import { FormControlValidation } from './form-control-validation';

export interface DynamicFormControlTemplate<Input extends FormControlInput = FormControlInput>
  extends DynamicFormFieldTemplate {
  input: Input;
  validation: FormControlValidation;
}
