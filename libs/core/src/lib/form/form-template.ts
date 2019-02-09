import { FormFieldTemplate } from '../form-field/models/form-field-template';

export interface FormTemplate extends FormFieldTemplate {
  fields: FormFieldTemplate[];
}
