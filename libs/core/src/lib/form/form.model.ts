import { FormFieldTemplate } from '../form-field/form-field.model';

export interface FormTemplate extends FormFieldTemplate {
  fields: FormFieldTemplate[];
}
