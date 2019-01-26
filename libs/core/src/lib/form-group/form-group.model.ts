import { FormGroup } from '@angular/forms';
import { FormField, FormFieldTemplate, FormFieldControl } from '../form-field/form-field.model';

export interface FormGroupTemplate extends FormFieldTemplate {
  fields: FormFieldTemplate[];
}

export class FormGroupField extends FormField<FormGroupTemplate, FormGroup> {
  protected _fields: FormField[];

  constructor(root: FormField, parent: FormField, template: FormGroupTemplate, model: any = null) {
    super(root, parent, template);
    this._model = model || this.createModel(parent, template);
  }

  get fields(): FormField[] { return this._fields; }

  setFields(fields: FormField[]) {
    this._fields = fields;
  }

  setControl(controls: { [key: string]: FormFieldControl }) {
    this._control = new FormGroup(controls);
  }

  destroy(): void {
    this.fields.forEach(field => field.destroy());
  }

  private createModel(parent: FormField, template: FormFieldTemplate): any {
    parent.model[template.key] = parent.model[template.key] || {};
    return parent.model[template.key];
  }
}
