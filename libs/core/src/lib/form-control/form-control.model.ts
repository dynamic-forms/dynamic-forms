import { FormControl } from '@angular/forms';
import { FormField, FormFieldTemplate, FormFieldExpressions, FormFieldData, Expression } from '../form-field/form-field.model';
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


export interface FormControlExpressions extends FormFieldExpressions {
  required?: Expression<boolean>;
}

export class FormControlField implements FormField {
  constructor(
    public parent: FormField,
    public path: string,
    public data: FormFieldData,
    public template: FormControlTemplate,
    public expressions: FormControlExpressions,
    public control: FormControl) {}
}
