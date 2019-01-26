import { FormControl } from '@angular/forms';
import { FormField, FormFieldTemplate, FormFieldExpressions } from '../form-field/form-field.model';
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

export class FormControlField extends FormField<FormControlTemplate, FormControl> {
  expressions?: FormFieldExpressions;

  constructor(root: FormField, parent: FormField, template: FormControlTemplate) {
    super(root, parent, template);
    this.model = this.getModel(parent, template);
  }

  destroy(): void {}

  private getModel(parent: FormField, template: FormFieldTemplate): any {
    parent.model[template.key] = parent.model[template.key] || null;
    return parent.model[template.key];
  }
}
