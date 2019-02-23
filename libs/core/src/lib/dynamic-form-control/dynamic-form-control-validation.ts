import { DynamicFormValidation } from '../dynamic-form-validation/dynamic-form-validation';

export interface DynamicFormControlValidation extends DynamicFormValidation {
  required?: boolean;
  email?: boolean;
  pattern?: boolean;
  min?: boolean;
  max?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
}
