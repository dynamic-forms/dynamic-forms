import { FormFieldWrapperType } from './../form-field-wrapper/form-field-wrapper-type';
import { FormFieldType } from './form-field-type';

export interface FormFieldTemplate {
  key: string;
  type: FormFieldType;
  wrappers: FormFieldWrapperType[];
  label: string;
  hidden?: boolean;
  disabled?: boolean;
  expressions?: { [key: string]: string };
}
