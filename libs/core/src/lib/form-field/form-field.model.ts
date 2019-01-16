import { FormGroup, FormArray, FormControl } from '@angular/forms';

export type FormTemplateType = 'group' | 'array' | 'control';
export type FormControlType = FormGroup | FormArray | FormControl;

export interface FormFieldTemplate {
  key: string;
  type: FormTemplateType;
  label: string;
}

export interface FormField {
  template: FormFieldTemplate;
  control: FormControlType;
  fields?: FormField[];
  parentModel?: any;
  model: any;
}
