import { FormArray } from '@angular/forms';
import { FormFieldTemplate, FormField, FormFieldData, FormFieldExpressions, Expression } from '../form-field/form-field.model';

export interface FormArrayTemplate extends FormFieldTemplate {
  fields: FormFieldTemplate[];
}

export interface FormArrayExpressions extends FormFieldExpressions {
  required?: Expression;
}

export class FormArrayField implements FormField {
  readonly path: string;

  data: FormFieldData;
  expressions?: FormArrayExpressions;
  control: FormArray;
  fields: FormField[];

  constructor(
    public root: FormField,
    public parent: FormField,
    public template: FormArrayTemplate) {
      this.path = parent && parent.path ? `${parent.path}.${template.key}` : template.key || null;
  }
}
