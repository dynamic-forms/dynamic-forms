import { FormFieldTemplate } from '../form-field/form-field-template';

export interface FormArrayTemplate extends FormFieldTemplate {
  fields: FormFieldTemplate[];
}
