import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupTemplate } from './form-group.model';
import { FormField, FormFieldTemplate } from '../form-field';
import { FormArrayBuilder, FormArrayTemplate } from '../form-array';
import { FormControlBuilder, FormControlTemplate } from '../form-control';

@Injectable()
export class FormGroupBuilder {
  constructor(
    private formArrayBuilder: FormArrayBuilder,
    private formControlBuilder: FormControlBuilder) {}

  createFormField(template: FormGroupTemplate, model: any): FormField {
    const fields = this.createFormFields(template.fields, model);
    const controls = this.getFieldControls(fields);
    const control = new FormGroup(controls);
    return { template, control, model, fields };
  }

  private createFormFields(templates: FormFieldTemplate[], model: any): FormField[] {
    return templates.map(template => {
      switch (template.type) {
        case 'group':
          return this.createFormGroupField(template, model);
        case 'array':
          return this.createFormArrayField(template, model);
        case 'control':
          return this.createFormControlField(template, model);
        default:
          return null;
      }
    });
  }

  private createFormGroupField(template: FormFieldTemplate, parentModel: any): FormField {
    const model = parentModel ? parentModel[template.key] : null;
    return this.createFormField(<FormGroupTemplate>template, model);
  }

  private createFormArrayField(template: FormFieldTemplate, parentModel: any): FormField {
    return this.formArrayBuilder.createFormField(<FormArrayTemplate>template, parentModel);
  }

  private createFormControlField(template: FormFieldTemplate, parentModel: any): FormField {
    return this.formControlBuilder.createFormField(<FormControlTemplate>template, parentModel);
  }

  private getFieldControls(fields: FormField[]) {
    return fields.reduce((result, field) => {
      result[field.template.key] = field.control;
      return result;
    }, {});
  }
}
