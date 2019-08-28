import { DynamicFormValidation } from '../dynamic-form-validation/dynamic-form-validation';

export interface DynamicFormGroupValidation extends DynamicFormValidation {
  [key: string]: any;
}
