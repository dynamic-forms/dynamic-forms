import { FormGroup } from '@angular/forms';
import { FormField, FormFieldTemplate } from '../../form-field';
import { FormGroupTemplate } from './form-group.template';

export class FormGroupField extends FormField<FormGroupTemplate, FormGroup> {
  protected _fields: FormField[] = [];

  constructor(root: FormField, parent: FormField, template: FormGroupTemplate, model: any = null) {
    super(root, parent, template);
    this._model = model || this.createModel(parent, template);
    this._control = new FormGroup({});
  }

  get fields() { return this._fields; }

  setFields(fields: FormField[]) {
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

  private createModel(parent: FormField, template: FormFieldTemplate): any {
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
