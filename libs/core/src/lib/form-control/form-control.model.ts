import { FormFieldTemplate } from '../form-field';

export interface FormControlTemplate extends FormFieldTemplate {
  input: { type: string };
}
