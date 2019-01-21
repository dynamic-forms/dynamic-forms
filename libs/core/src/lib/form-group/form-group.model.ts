import { FormGroup } from '@angular/forms';
import { FormField, FormFieldTemplate, FormFieldExpressions, FormFieldData, Expression } from '../form-field/form-field.model';

export interface FormGroupTemplate extends FormFieldTemplate {
  fields: FormFieldTemplate[];
}

export interface FormGroupExpressions extends FormFieldExpressions {
  required?: Expression;
}

export class FormGroupField implements FormField {
  readonly path: string;

  data: FormFieldData;
  expressions?: FormGroupExpressions;
  control: FormGroup;
  fields: FormField[];

  constructor(
    public root: FormField,
    public parent: FormField,
    public template: FormGroupTemplate) {
      this.path = parent && parent.path ? `${parent.path}.${template.key}` : template.key || null;
  }
}
