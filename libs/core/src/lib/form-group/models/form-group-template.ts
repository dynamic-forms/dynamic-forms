import { FormFieldTemplate } from '../../form-field/models/form-field-template';

export interface FormGroupTemplate extends FormFieldTemplate {
  disabled?: boolean;
  fields: FormFieldTemplate[];
}
