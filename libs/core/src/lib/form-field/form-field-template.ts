import { FormFieldType } from './form-field-type';

export interface FormFieldTemplate {
  key: string;
  type: FormFieldType;
  label: string;
  hidden?: boolean;
  disabled?: boolean;
  expressions?: { [key: string]: string };
}
