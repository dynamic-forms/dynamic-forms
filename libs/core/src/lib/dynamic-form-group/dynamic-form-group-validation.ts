import { DynamicFormFieldValidation } from '../dynamic-form-field/dynamic-form-field-validation';

export interface DynamicFormGroupValidation extends DynamicFormFieldValidation {
  [key: string]: any;
}
