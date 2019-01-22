import { FormGroup } from '@angular/forms';
import { FormField, FormFieldTemplate, FormFieldExpressions, Expression } from '../form-field/form-field.model';

export interface FormGroupTemplate extends FormFieldTemplate {
  fields: FormFieldTemplate[];
}

export interface FormGroupExpressions extends FormFieldExpressions {
  required?: Expression;
}

export class FormGroupField implements FormField {
  readonly path: string;

  expressions?: FormGroupExpressions;
  control: FormGroup;
  fields: FormField[];

  constructor(
    public readonly root: FormField,
    public readonly parent: FormField,
    public readonly template: FormGroupTemplate,
    public model: any = null) {
      this.path = parent && parent.path ? `${parent.path}.${template.key}` : template.key || null;
      this.model = this.model || this.createModel(parent, template);
  }

  private createModel(parent: FormField, template: FormFieldTemplate): any {
    parent.model[template.key] = parent.model[template.key] || {};
    return parent.model[template.key];
  }
}
