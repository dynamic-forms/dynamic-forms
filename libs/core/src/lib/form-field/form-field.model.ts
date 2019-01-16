import { Type } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

export type FormTemplateType = 'group' | 'array' | 'control';
export type FormControlType = FormGroup | FormArray | FormControl;

export interface FormFieldConfig {
  type: FormTemplateType;
  component: Type<any>;
}

export interface FormFieldTemplate {
  key: string;
  type: FormTemplateType;
  label: string;
}

export interface FormField {
  path: string;
  template: FormFieldTemplate;
  control: FormControlType;
  fields?: FormField[];
  parentModel?: any;
  model: any;
}
