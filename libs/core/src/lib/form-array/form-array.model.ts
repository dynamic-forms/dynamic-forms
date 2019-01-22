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
  model: any;

  expressions?: FormArrayExpressions;
  control: FormArray;
  fields: FormField[];

  constructor(
    public readonly root: FormField,
    public readonly parent: FormField,
    public readonly template: FormArrayTemplate) {
      this.path = parent && parent.path ? `${parent.path}.${template.key}` : template.key || null;
      this.model = this.getModel(parent, template);
    }

    private getModel(parent: FormField, template: FormFieldTemplate): any {
      parent.model[template.key] = parent.model[template.key] || [];
      return parent.model[template.key];
    }
}
