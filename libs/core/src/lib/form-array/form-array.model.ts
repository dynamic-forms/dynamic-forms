import { FormArray } from '@angular/forms';
import { FormFieldTemplate, FormField, FormFieldExpressions } from '../form-field/form-field.model';

export interface FormArrayTemplate extends FormFieldTemplate {
  fields: FormFieldTemplate[];
}

export class FormArrayField extends FormField<FormArrayTemplate, FormArray> {
  expressions?: FormFieldExpressions;
  fields: FormField[];

  constructor(root: FormField, parent: FormField, template: FormArrayTemplate) {
    super(root, parent, template);
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
