import { DynamicFormElementTemplate } from '../dynamic-form-element/dynamic-form-element-template';
import { DynamicFormFieldValidation } from './dynamic-form-field-validation';

export interface DynamicFormFieldTemplate<
  Validation extends DynamicFormFieldValidation = DynamicFormFieldValidation,
> extends DynamicFormElementTemplate {
  label?: string;
  hidden?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  validation?: Validation;
}
