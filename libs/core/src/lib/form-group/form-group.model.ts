import { FormGroup } from '@angular/forms';
import { FormField, FormFieldTemplate, FormFieldExpressions, FormFieldData } from '../form-field/form-field.model';
import { Expression } from '../form-expressions/form-expressions.model';

export interface FormGroupTemplate extends FormFieldTemplate {
  expressions?: { [key: string]: string };
  fields: FormFieldTemplate[];
}

export interface FormGroupExpressions extends FormFieldExpressions {
  required?: Expression;
}

export class FormGroupField implements FormField {
  constructor(
    public path: string,
    public template: FormGroupTemplate,
    public expressions: FormGroupExpressions,
    public control: FormGroup,
    public data: FormFieldData,
    public fields: FormField[]) {}
}
