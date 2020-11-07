import { DynamicFormFieldTemplate } from '../dynamic-form-field/dynamic-form-field-template';

export interface DynamicFormTemplate extends DynamicFormFieldTemplate {
  classNameWrapper: undefined;
  classNameLabel?: string;
  classNameHeader?: string;
  classNameElements?: string;
  classNameFooter?: string;
}
