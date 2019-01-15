import { FormFieldTemplate } from '../form-field';

export interface FormArrayTemplate extends FormFieldTemplate {
  fields: FormFieldTemplate[];
}
