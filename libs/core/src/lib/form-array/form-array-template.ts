import { FormFieldTemplate } from '../form-field/models/form-field-template';

export interface FormArrayTemplate extends FormFieldTemplate {
  fields: FormFieldTemplate[];
}
