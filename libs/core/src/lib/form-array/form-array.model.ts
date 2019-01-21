import { FormArray } from '@angular/forms';
import { FormFieldTemplate, FormField, FormFieldData, FormFieldExpressions, Expression } from '../form-field/form-field.model';

export interface FormArrayTemplate extends FormFieldTemplate {
  fields: FormFieldTemplate[];
}

export interface FormArrayExpressions extends FormFieldExpressions {
  required?: Expression;
}

export class FormArrayField implements FormField {
  constructor(
    public parent: FormField,
    public path: string,
    public data: FormFieldData,
    public template: FormArrayTemplate,
    public expressions: FormArrayExpressions,
    public control: FormArray,
    public fields: FormField[]) {}
}
