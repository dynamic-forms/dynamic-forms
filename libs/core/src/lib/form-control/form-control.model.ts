import { Type } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormFieldTemplate, FormField } from '../form-field/form-field.model';

export interface FormControlConfig {
  type: string;
  component: Type<any>;
}

export interface FormControlOption {
  value: string | number;
  label: string;
}

export interface FormControlInput {
  type: string;
  placeholder: string;
  options?: FormControlOption[];
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
    public path: string,
    public template: FormControlTemplate,
    public control: FormControl,
    public parentModel: any,
    public model: any) {}
}
