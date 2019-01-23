import { FormControl } from '@angular/forms';
import { FormField, FormFieldTemplate, FormFieldExpressions, Expression } from '../form-field/form-field.model';
import { FormControlInput } from './form-input/form-input.model';
import { FormValidation } from '../form-validation/form-validation.model';

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

export type ExpressionFunction = Function;
export type ExpressionDependency = string;

export class FormControlField implements FormField {
  readonly path: string;
  expressions?: FormFieldExpressions;
  control: FormControl;
  fields: FormField[];
  model: any;

  constructor(
    public readonly root: FormField,
    public readonly parent: FormField,
    public readonly template: FormControlTemplate
  ) {
    this.path = parent.path ? `${parent.path}.${template.key}` : template.key || null;
    this.model = this.getModel(parent, template);
  }

  private getModel(parent: FormField, template: FormFieldTemplate): any {
    parent.model[template.key] = parent.model[template.key] || null;
    return parent.model[template.key];
  }
}
