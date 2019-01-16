import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupTemplate, FormGroupField } from './form-group.model';
import { FormField, FormFieldTemplate } from '../form-field';
import { FormArrayBuilder, FormArrayTemplate } from '../form-array';
import { FormControlBuilder, FormControlTemplate } from '../form-control';

@Injectable()
export class FormGroupBuilder {
  constructor(
    private formArrayBuilder: FormArrayBuilder,
    private formControlBuilder: FormControlBuilder) {}

  createFormField(template: FormGroupTemplate, model: any): FormGroupField {
    const fields = this.createFormFields(template.fields, model);
    const controls = this.getFieldControls(fields);
    const control = new FormGroup(controls);
    return new FormGroupField(template, control, model, fields);
  }

  private createFormFields(templates: FormFieldTemplate[], parentModel: any): FormField[] {
    return templates.map(template => {
      switch (template.type) {
        case 'group':
          return this.createFormGroupField(template, parentModel);
        case 'array':
          return this.formArrayBuilder.createFormField(<FormArrayTemplate>template, parentModel);
        case 'control':
          return this.formControlBuilder.createFormField(<FormControlTemplate>template, parentModel);
        default:
          return null;
      }
    });
  }

  private createFormGroupField(template: FormFieldTemplate, parentModel: any): FormGroupField {
    const model = parentModel ? parentModel[template.key] : null;
    return this.createFormField(<FormGroupTemplate>template, model);
  }

  private getFieldControls(fields: FormField[]) {
    return fields.reduce((result, field) => {
      result[field.template.key] = field.control;
      return result;
    }, {});
  }
}
