import { FormGroup } from '@angular/forms';
import { FormField, FormFieldTemplate, FormFieldExpressions, FormFieldData, Expression } from '../form-field/form-field.model';

export interface FormGroupTemplate extends FormFieldTemplate {
  fields: FormFieldTemplate[];
}

export interface FormGroupExpressions extends FormFieldExpressions {
  required?: Expression;
}

export class FormGroupField implements FormField {
  control: FormGroup;
  fields: FormField[];

  constructor(
    public parent: FormField,
    public path: string,
    public data: FormFieldData,
    public template: FormGroupTemplate,
    public expressions: FormGroupExpressions) {}
}
