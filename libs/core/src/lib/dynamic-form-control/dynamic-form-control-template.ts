import { DynamicFormFieldTemplate } from '../dynamic-form-field/dynamic-form-field-template';
import { DynamicFormInput } from '../dynamic-form-input/dynamic-form-input';
import { DynamicFormControlValidation } from './dynamic-form-control-validation';

export interface DynamicFormControlTemplate<FormInput extends DynamicFormInput = DynamicFormInput>
  extends DynamicFormFieldTemplate {
  input: FormInput;
  validation: DynamicFormControlValidation;
}
