import { FormFieldTemplate } from '../dynamic-form-field';

export interface FormArrayTemplate extends FormFieldTemplate {
  items: FormFieldTemplate[];
}
