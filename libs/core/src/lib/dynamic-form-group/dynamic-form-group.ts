import { FormGroup } from '@angular/forms';
import { DynamicFormField } from './../dynamic-form-field/dynamic-form-field';
import { DynamicFormGroupDefinition } from './dynamic-form-group-definition';
import { DynamicFormGroupTemplate } from './dynamic-form-group-template';

export class DynamicFormGroup extends DynamicFormField<
  FormGroup, DynamicFormGroupTemplate, DynamicFormGroupDefinition> {

  protected _fields: DynamicFormField[] = [];

  constructor(root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormGroupDefinition, model: any = null) {
    super(root, parent, definition);
    this._model = model || this.createModel(parent, definition);
    this._control = new FormGroup({});
  }

  get fields() { return this._fields; }

  setFields(fields: DynamicFormField[]) {
    this._fields = fields || [];
    this._fields.forEach(field => {
      this._control.registerControl(field.definition.key, field.control);
    });
  }

  check() {
    this.checkControl();
    this.fields.forEach(field => field.check());
  }

  destroy() {
    this.fields.forEach(field => field.destroy());
  }

  private createModel(parent: DynamicFormField, definition: DynamicFormGroupDefinition): any {
    parent.model[definition.key] = parent.model[definition.key] || {};
    return parent.model[definition.key];
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
