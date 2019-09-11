import { DynamicFormFieldValidation } from '../dynamic-form-field/dynamic-form-field-validation';

export interface DynamicFormControlValidation extends DynamicFormFieldValidation {
  required?: boolean;
  email?: boolean;
  pattern?: boolean;
  min?: boolean;
  max?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
}
