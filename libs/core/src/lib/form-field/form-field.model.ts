import { FormGroup, FormArray, FormControl } from '@angular/forms';

export type FormTemplateType = 'group' | 'array' | 'control';
export type FormControlType = FormGroup | FormArray | FormControl;

export interface FormFieldTemplate {
  key: string;
  type: FormTemplateType;
  label: string;
  hidden?: boolean;
  disabled?: boolean;
}

export interface FormField {
  path: string;
  template: FormFieldTemplate;
  control: FormControlType;
  fields?: FormField[];
  parentModel?: any;
  model: any;
}
