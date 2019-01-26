import { FormGroup } from '@angular/forms';
import { FormField, FormFieldTemplate, FormFieldExpressions } from '../form-field/form-field.model';

export interface FormGroupTemplate extends FormFieldTemplate {
  fields: FormFieldTemplate[];
}

export class FormGroupField extends FormField<FormGroupTemplate, FormGroup> {
  expressions?: FormFieldExpressions;
  fields: FormField[];

  constructor(root: FormField, parent: FormField, template: FormGroupTemplate, model: any = null) {
    super(root, parent, template);
    this.model = model || this.createModel(parent, template);
  }

  destroy(): void {
    this.fields.forEach(field => field.destroy());
  }

  private createModel(parent: FormField, template: FormFieldTemplate): any {
    parent.model[template.key] = parent.model[template.key] || {};
    return parent.model[template.key];
  }
}
