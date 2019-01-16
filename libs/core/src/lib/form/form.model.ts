import { FormFieldTemplate } from '../form-field';

export interface FormTemplate extends FormFieldTemplate {
  fields: FormFieldTemplate[];
}
