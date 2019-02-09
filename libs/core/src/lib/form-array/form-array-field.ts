import { FormArray } from '@angular/forms';
import { FormField } from '../form-field/form-field';
import { FormFieldTemplate } from '../form-field/form-field-template';
import { FormArrayTemplate } from './form-array-template';

export class FormArrayField extends FormField<FormArrayTemplate, FormArray> {
  protected _fields: FormField[] = [];

  constructor(root: FormField, parent: FormField, template: FormArrayTemplate) {
    super(root, parent, template);
    this._model = this.getModel(parent, template);
    this._control = new FormArray([]);
  }

  get fields() { return this._fields; }

  setFields(fields: FormField[]) {
    this._fields = fields || [];
  }

  check() {
    this.fields.forEach(field => field.check());
  }

  destroy() {
    this.fields.forEach(field => field.destroy());
  }

  private getModel(parent: FormField, template: FormFieldTemplate) {
    parent.model[template.key] = parent.model[template.key] || [];
    return parent.model[template.key];
  }
}
