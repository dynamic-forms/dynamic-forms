import { DynamicFormFieldWrapperType } from './../dynamic-form-field-wrapper/dynamic-form-field-wrapper-type';
import { DynamicFormFieldType } from './dynamic-form-field-type';

export interface DynamicFormFieldTemplate {
  key: string;
  type: DynamicFormFieldType;
  wrappers: DynamicFormFieldWrapperType[];
  label: string;
  hidden?: boolean;
  disabled?: boolean;
  expressions?: { [key: string]: string };
}
