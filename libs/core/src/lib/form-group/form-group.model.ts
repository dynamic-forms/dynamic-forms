import { FormGroup } from '@angular/forms';
import { FormField, FormFieldTemplate, FormFieldExpressions, Expression } from '../form-field/form-field.model';

export interface FormGroupTemplate extends FormFieldTemplate {
  fields: FormFieldTemplate[];
}

export class FormGroupField implements FormField {
  readonly path: string;
  expressions?: FormFieldExpressions;
  control: FormGroup;
  fields: FormField[];
  model: any;

  constructor(
    public readonly root: FormField,
    public readonly parent: FormField,
    public readonly template: FormGroupTemplate,
    model: any = null
  ) {
    this.path = parent && parent.path ? `${parent.path}.${template.key}` : template.key || null;
    this.model = model || this.createModel(parent, template);
  }

  private createModel(parent: FormField, template: FormFieldTemplate): any {
    parent.model[template.key] = parent.model[template.key] || {};
    return parent.model[template.key];
  }
}
