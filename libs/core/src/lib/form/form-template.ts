import { FormFieldTemplate } from '../form-field/form-field-template';

export interface FormTemplate extends FormFieldTemplate {
  fields: FormFieldTemplate[];
}
