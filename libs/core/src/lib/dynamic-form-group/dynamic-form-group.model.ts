import { FormFieldTemplate } from '../dynamic-form-field';

export interface FormGroupTemplate extends FormFieldTemplate {
  items: FormFieldTemplate[];
}
