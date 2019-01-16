import { FormFieldTemplate, FormField } from '../form-field';
import { FormControl } from '@angular/forms';

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

export class FormControlField implements FormField {
  constructor(
    public template: FormControlTemplate,
    public control: FormControl,
    public parentModel: any,
    public model: any) {}
}
