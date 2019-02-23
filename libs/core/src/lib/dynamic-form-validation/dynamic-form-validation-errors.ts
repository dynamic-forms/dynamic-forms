import { DynamicFormValidationError } from './dynamic-form-validation-error';

export interface DynamicFormValidationErrors {
  [key: string]: DynamicFormValidationError;
}
