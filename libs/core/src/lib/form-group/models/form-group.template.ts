import { FormFieldTemplate } from '../../form-field/form-field.model';

export interface FormGroupTemplate extends FormFieldTemplate {
  disabled?: boolean;
  fields: FormFieldTemplate[];
}
