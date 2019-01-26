import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

export type FormFieldType = 'group' | 'array' | 'control';
export type FormFieldControl = AbstractControl | FormGroup | FormArray | FormControl;

export interface FormFieldTemplate {
  key: string;
  type: FormFieldType;
  label: string;
  hidden?: boolean;
  expressions?: { [key: string]: string };
}

export type ExpressionFunction = Function;
export type ExpressionDependency = string;

export interface Expression {
  deps: ExpressionDependency[];
  func: ExpressionFunction;
  value: any;
}

export interface FormFieldExpression extends Expression {
  field: FormField;
}

export interface FormFieldExpressions {
  [key: string]: FormFieldExpression;
}

export abstract class FormField<Template extends FormFieldTemplate = FormFieldTemplate,
  Control extends FormFieldControl = FormFieldControl> {

  readonly path: string;
  control: Control;
  model: any;

  constructor(
    public readonly root: FormField,
    public readonly parent: FormField,
    public readonly template: Template
  ) {
    this.path = parent && parent.path ? `${parent.path}.${template.key}` : template.key || null;
  }

  abstract destroy(): void;
}
