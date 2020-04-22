import { DynamicFormFieldValidation } from './dynamic-form-field-validation';

export interface DynamicFormFieldTemplate<Validation extends DynamicFormFieldValidation = DynamicFormFieldValidation> {
  label?: string;
  hidden?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  className?: string;
  validation?: Validation;
}
