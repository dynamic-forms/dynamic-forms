import { FormFieldTemplate } from './../form-field/form-field-template';

export interface FormGroupTemplate extends FormFieldTemplate {
  disabled?: boolean;
  fields: FormFieldTemplate[];
}
