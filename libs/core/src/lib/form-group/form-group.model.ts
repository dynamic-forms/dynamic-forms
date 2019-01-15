import { FormFieldTemplate } from '../form-field';

export interface FormGroupTemplate extends FormFieldTemplate {
  fields: FormFieldTemplate[];
}
