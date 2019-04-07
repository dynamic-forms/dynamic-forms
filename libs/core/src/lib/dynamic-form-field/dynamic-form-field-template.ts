import { DynamicFormWrapperType } from '../dynamic-form-wrapper/dynamic-form-wrapper-type';
import { DynamicFormFieldType } from './dynamic-form-field-type';

export interface DynamicFormFieldTemplate {
  key: string;
  type: DynamicFormFieldType;
  wrappers?: DynamicFormWrapperType[];
  label?: string;
  hidden?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  expressions?: { [key: string]: string };
}
