import { FormValidationError } from './form-validation-error';

export interface FormValidationErrors {
  [key: string]: FormValidationError;
}
