import { DynamicFormFieldValidation } from '../dynamic-form-field/dynamic-form-field-validation';

export interface DynamicFormDictionaryValidation extends DynamicFormFieldValidation {
  minLength?: boolean;
  maxLength?: boolean;
}
