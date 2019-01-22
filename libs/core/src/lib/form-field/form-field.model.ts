import { FormGroup, FormArray, FormControl } from '@angular/forms';

export type FormTemplateType = 'group' | 'array' | 'control';
export type FormControlType = FormGroup | FormArray | FormControl;

export interface FormFieldTemplate {
  key: string;
  type: FormTemplateType;
  label: string;
  hidden?: boolean;
  disabled?: boolean;
  expressions?: { [key: string]: string };
}

export type ExpressionFunction = Function;
export type ExpressionDependency = string;

export interface Expression<T = any> {
  deps: ExpressionDependency[];
  func: ExpressionFunction;
  value: T;
}

export interface FormExpressions {
  [key: string]: Expression<any>;
}

export interface FormFieldExpression<T = any> extends Expression<T> {
  field: FormField;
}

export interface FormFieldExpressions extends FormExpressions {
  label?: Expression<string>;
  hidden?: FormFieldExpression<boolean>;
  disabled?: FormFieldExpression<boolean>;
}

export interface FormFieldData {
  model?: any;
  parentModel?: any;
  rootModel?: any;
}

export interface FormField {
  path: string;
  root: FormField;
  parent: FormField;
  template: FormFieldTemplate;
  model: any;
  expressions?: FormFieldExpressions;
  control: FormControlType;
  fields?: FormField[];
}
