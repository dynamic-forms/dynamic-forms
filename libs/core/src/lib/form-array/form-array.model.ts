import { FormArray } from '@angular/forms';
import { FormFieldTemplate, FormField, FormFieldExpressions } from '../form-field/form-field.model';

export interface FormArrayTemplate extends FormFieldTemplate {
  fields: FormFieldTemplate[];
}

export class FormArrayField implements FormField {
  readonly path: string;
  expressions?: FormFieldExpressions;
  control: FormArray;
  fields: FormField[];
  model: any;

  constructor(
    public readonly root: FormField,
    public readonly parent: FormField,
    public readonly template: FormArrayTemplate
  ) {
    this.path = parent && parent.path ? `${parent.path}.${template.key}` : template.key || null;
    this.model = this.getModel(parent, template);
  }

  destroy(): void {
    this.fields.forEach(field => field.destroy());
  }

  private getModel(parent: FormField, template: FormFieldTemplate): any {
    parent.model[template.key] = parent.model[template.key] || [];
    return parent.model[template.key];
  }
}
