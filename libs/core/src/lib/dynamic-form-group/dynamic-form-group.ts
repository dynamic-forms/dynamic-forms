import { FormGroup } from '@angular/forms';
import { DynamicFormField } from './../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldTemplate } from './../dynamic-form-field/dynamic-form-field-template';
import { DynamicFormGroupTemplate } from './dynamic-form-group-template';

export class DynamicFormGroup extends DynamicFormField<DynamicFormGroupTemplate, FormGroup> {
  protected _fields: DynamicFormField[] = [];

  constructor(root: DynamicFormField, parent: DynamicFormField, template: DynamicFormGroupTemplate, model: any = null) {
    super(root, parent, template);
    this._model = model || this.createModel(parent, template);
    this._control = new FormGroup({});
  }

  get fields() { return this._fields; }

  setFields(fields: DynamicFormField[]) {
    this._fields = fields || [];
    this._fields.forEach(field => {
      this._control.registerControl(field.template.key, field.control);
    });
  }

  check() {
    this.checkControl();
    this.fields.forEach(field => field.check());
  }

  destroy() {
    this.fields.forEach(field => field.destroy());
  }

  private createModel(parent: DynamicFormField, template: DynamicFormFieldTemplate): any {
    parent.model[template.key] = parent.model[template.key] || {};
    return parent.model[template.key];
  }

  private checkControl(): void {
    const disabled = (this.parent && this.parent.control.disabled) || this.template.disabled || false;
    if (this.control.disabled !== disabled) {
      if (disabled) {
        this.control.disable();
      } else {
        this.control.enable();
      }
    }
  }
}
