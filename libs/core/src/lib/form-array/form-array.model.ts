import { FormArray } from '@angular/forms';
import { FormFieldTemplate, FormField, FormFieldControl } from '../form-field/form-field.model';

export interface FormArrayTemplate extends FormFieldTemplate {
  fields: FormFieldTemplate[];
}

export class FormArrayField extends FormField<FormArrayTemplate, FormArray> {
  protected _fields: FormField[];

  constructor(root: FormField, parent: FormField, template: FormArrayTemplate) {
    super(root, parent, template);
    this._model = this.getModel(parent, template);
  }

  get fields(): FormField[] { return this._fields; }

  setFields(fields: FormField[]) {
    this._fields = fields;
  }

  setControl(controls: FormFieldControl[]) {
    this._control = new FormArray(controls);
  }

  destroy(): void {
    this._fields.forEach(field => field.destroy());
  }

  private getModel(parent: FormField, template: FormFieldTemplate): any {
    parent.model[template.key] = parent.model[template.key] || [];
    return parent.model[template.key];
  }
}
