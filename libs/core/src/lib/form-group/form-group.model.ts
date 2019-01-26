import { FormGroup } from '@angular/forms';
import { FormField, FormFieldTemplate, FormFieldControl } from '../form-field/form-field.model';

export interface FormGroupTemplate extends FormFieldTemplate {
  fields: FormFieldTemplate[];
}

export class FormGroupField extends FormField<FormGroupTemplate, FormGroup> {
  fields: FormField[];

  constructor(root: FormField, parent: FormField, template: FormGroupTemplate, model: any = null) {
    super(root, parent, template);
    this.model = model || this.createModel(parent, template);
  }

  setFields(fields: FormField[]) {
    this.fields = fields;
  }

  setControl(controls: { [key: string]: FormFieldControl }) {
    this.control = new FormGroup(controls);
    this.control.valueChanges.subscribe(value => {
      // console.log(data.model, value);
      this.parent.model[this.template.key] = value;
      this.model = value;
    });
  }

  destroy(): void {
    this.fields.forEach(field => field.destroy());
  }

  private createModel(parent: FormField, template: FormFieldTemplate): any {
    parent.model[template.key] = parent.model[template.key] || {};
    return parent.model[template.key];
  }
}
