import { DynamicFormFieldValidation } from '../dynamic-form-field/dynamic-form-field-validation';

export interface DynamicFormGroupValidation extends DynamicFormFieldValidation {
  required?: boolean;
  allRequired?: boolean;
  equal?: boolean;
  [key: string]: boolean;
}
