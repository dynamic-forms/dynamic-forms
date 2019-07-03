import { DynamicFormInputOptionItem } from './dynamic-form-input-option-item';
import { DynamicFormInputType } from './dynamic-form-input-type';

export interface DynamicFormInput {
  type: DynamicFormInputType;
  defaultValue?: any;
  placeholder?: string;
  inputType?: string;
  options?: string[] | DynamicFormInputOptionItem[];
  multiple?: boolean;
  pattern?: string | RegExp;
  min?: number | Date;
  max?: number | Date;
  minLength?: number;
  maxLength?: number;
}
