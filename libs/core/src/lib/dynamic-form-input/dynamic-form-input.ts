import { DynamicFormInputOptionItem } from './dynamic-form-input-option-item';

export interface DynamicFormInput<TValue = any> {
  type: string;
  defaultValue?: TValue;
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
