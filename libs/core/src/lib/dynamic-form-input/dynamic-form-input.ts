import { DynamicFormInputOptions } from './dynamic-form-input-options';
import { DynamicFormInputType } from './dynamic-form-input-type';

export interface DynamicFormInput {
  type: DynamicFormInputType;
  defaultValue?: any;
  placeholder?: string;
  inputType?: string;
  options?: string[] | DynamicFormInputOptions;
  pattern?: string | RegExp;
  min?: number | Date;
  max?: number | Date;
  minLength?: number;
  maxLength?: number;
}
