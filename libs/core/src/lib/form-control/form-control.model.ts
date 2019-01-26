import { FormControl, ValidatorFn } from '@angular/forms';
import { FormField, FormFieldTemplate } from '../form-field/form-field.model';
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
  constructor(root: FormField, parent: FormField, template: FormControlTemplate) {
    super(root, parent, template);
    this.model = this.getModel(parent, template);
  }

  setControl(validators: ValidatorFn[]) {
    this.control = new FormControl(this.model, validators);
    this.control.valueChanges.subscribe(value => {
      this.parent.model[this.template.key] = value;
      this.model = value;
    });
  }

  destroy(): void {}

  private getModel(parent: FormField, template: FormFieldTemplate): any {
    parent.model[template.key] = parent.model[template.key] || null;
    return parent.model[template.key];
  }
}
