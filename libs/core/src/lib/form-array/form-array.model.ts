import { FormArray } from '@angular/forms';
import { FormFieldTemplate, FormField, FormFieldData, FormFieldExpressions } from '../form-field/form-field.model';
import { Expression } from '../form-expressions/form-expressions.model';

export interface FormArrayTemplate extends FormFieldTemplate {
  fields: FormFieldTemplate[];
}

export interface FormArrayExpressions extends FormFieldExpressions {
  required?: Expression;
}

export class FormArrayField implements FormField {
  constructor(
    public path: string,
    public data: FormFieldData,
    public template: FormArrayTemplate,
    public expressions: FormArrayExpressions,
    public control: FormArray,
    public fields: FormField[]) {}
}
