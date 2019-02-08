import { FormFieldTemplate } from '../../form-field';

export interface FormGroupTemplate extends FormFieldTemplate {
  disabled?: boolean;
  fields: FormFieldTemplate[];
}
