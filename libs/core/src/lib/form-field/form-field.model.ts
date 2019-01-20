import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { FormExpressions, Expression } from '../form-expressions/form-expressions.model';

export type FormTemplateType = 'group' | 'array' | 'control';
export type FormControlType = FormGroup | FormArray | FormControl;

export interface FormFieldTemplate {
  key: string;
  type: FormTemplateType;
  label: string;
  hidden?: boolean;
  disabled?: boolean;
}

export interface FormFieldExpressions extends FormExpressions {
  hidden?: Expression;
  disabled?: Expression;
}

export interface FormFieldData {
  model?: any;
  parentModel?: any;
  rootModel?: any;
}

export interface FormField {
  path: string;
  template: FormFieldTemplate;
  control: FormControlType;
  expressions?: FormFieldExpressions;
  fields?: FormField[];
  parentModel?: any;
  model?: any;
}
