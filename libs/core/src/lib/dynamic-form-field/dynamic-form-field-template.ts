import { FormFieldWrapperType } from './../dynamic-form-field-wrapper/form-field-wrapper-type';
import { FormFieldType } from './form-field-type';

export interface DynamicFormFieldTemplate {
  key: string;
  type: FormFieldType;
  wrappers: FormFieldWrapperType[];
  label: string;
  hidden?: boolean;
  disabled?: boolean;
  expressions?: { [key: string]: string };
}
