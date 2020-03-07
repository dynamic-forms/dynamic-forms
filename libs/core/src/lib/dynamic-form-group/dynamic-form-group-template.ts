import { DynamicFormFieldTemplate } from '../dynamic-form-field/dynamic-form-field-template';

export interface DynamicFormGroupTemplate extends DynamicFormFieldTemplate {
  labelHidden?: boolean;
  classNameLabel?: string;
  classNameElements?: string;
  classNameActions?: string;
}
