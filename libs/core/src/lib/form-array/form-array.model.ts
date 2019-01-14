import { FormFieldTemplate } from '../form-field';

export interface FormArrayTemplate extends FormFieldTemplate {
  items: FormFieldTemplate[];
}
