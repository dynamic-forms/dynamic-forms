import { Type } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormFieldTemplate, FormField } from '../form-field/form-field.model';
import { FormControlInput } from './form-input/form-input.model';
import { FormValidation } from '../form-validation/form-validation.model';

export interface FormControlConfig {
  type: string;
  component: Type<any>;
}

export interface FormControlValidation extends FormValidation {
  required?: boolean;
  email?: boolean;
  pattern?: boolean;
  min?: boolean;
  max?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
}

export interface FormControlTemplate extends FormFieldTemplate {
  input: FormControlInput;
  validation: FormControlValidation;
}

export class FormControlField implements FormField {
  constructor(
    public path: string,
    public template: FormControlTemplate,
    public control: FormControl,
    public parentModel: any,
    public model: any) {}
}
