import { FormFieldTemplate } from '../dynamic-form-field';

export interface FormTemplate extends FormFieldTemplate {
  items: FormFieldTemplate[];
}
