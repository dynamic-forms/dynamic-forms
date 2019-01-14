import { FormFieldTemplate } from '../dynamic-form-field';

export interface FormControlTemplate extends FormFieldTemplate {
  input: { type: string };
}
