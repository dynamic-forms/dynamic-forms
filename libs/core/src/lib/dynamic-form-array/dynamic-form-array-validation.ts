import { DynamicFormFieldValidation } from '../dynamic-form-field/dynamic-form-field-validation';

export interface DynamicFormArrayValidation extends DynamicFormFieldValidation {
  required?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
}
