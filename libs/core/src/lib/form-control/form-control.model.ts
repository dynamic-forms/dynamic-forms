import { FormFieldTemplate } from '../form-field';

export interface FormControlInput {
  type: string;
  placeholder: string;
}

export interface FormControlValidators {
  required?: boolean;
  email?: boolean;
  pattern?: string | RegExp;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
}

export interface FormControlTemplate extends FormFieldTemplate {
  input: FormControlInput;
  validators: FormControlValidators;
}
