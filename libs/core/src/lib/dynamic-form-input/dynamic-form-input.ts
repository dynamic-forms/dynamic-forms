import { DynamicFormInputOptionItem } from './dynamic-form-input-option-item';

export interface DynamicFormInput {
  type: string;
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
