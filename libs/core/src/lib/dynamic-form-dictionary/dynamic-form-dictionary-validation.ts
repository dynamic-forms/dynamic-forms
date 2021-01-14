import { DynamicFormFieldValidation } from '../dynamic-form-field/dynamic-form-field-validation';

export interface DynamicFormDictionaryValidation extends DynamicFormFieldValidation {
  required?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
}
