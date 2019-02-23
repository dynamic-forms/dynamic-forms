import { FormArray } from '@angular/forms';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldTemplate } from '../dynamic-form-field/dynamic-form-field-template';
import { DynamicFormArrayTemplate } from './dynamic-form-array-template';

export class DynamicFormArray extends DynamicFormField<DynamicFormArrayTemplate, FormArray> {
  protected _fields: DynamicFormField[] = [];

  constructor(root: DynamicFormField, parent: DynamicFormField, template: DynamicFormArrayTemplate) {
    super(root, parent, template);
    this._model = this.getModel(parent, template);
    this._control = new FormArray([]);
  }

  get fields() { return this._fields; }

  setFields(fields: DynamicFormField[]) {
    this._fields = fields || [];
  }

  check() {
    this.fields.forEach(field => field.check());
  }

  destroy() {
    this.fields.forEach(field => field.destroy());
  }

  private getModel(parent: DynamicFormField, template: DynamicFormFieldTemplate) {
    parent.model[template.key] = parent.model[template.key] || [];
    return parent.model[template.key];
  }
}
