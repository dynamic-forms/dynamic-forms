import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupTemplate, FormGroupField } from './form-group.model';
import { FormFieldTemplate, FormField } from '../form-field/form-field.model';
import { FormFieldBuilder } from '../form-field/form-field.builder';
import { FormArrayTemplate } from '../form-array/form-array.model';
import { FormArrayBuilder } from '../form-array/form-array.builder';
import { FormControlTemplate } from '../form-control/form-control.model';
import { FormControlBuilder } from '../form-control/form-control.builder';

@Injectable()
export class FormGroupBuilder extends FormFieldBuilder {
  constructor(
    private formArrayBuilder: FormArrayBuilder,
    private formControlBuilder: FormControlBuilder) {
      super();
    }

  createFormField(path: string, model: any, template: FormGroupTemplate): FormGroupField {
    const fields = this.createFormFields(template.fields, path, model);
    const controls = this.getFieldControls(fields);
    const control = new FormGroup(controls);
    return new FormGroupField(path, template, control, model, fields);
  }

  private createFormFields(templates: FormFieldTemplate[], parentPath: string, parentModel: any): FormField[] {
    return templates.map(template => {
      switch (template.type) {
        case 'group':
          return this.createFormGroupField(parentPath, parentModel, template);
        case 'array':
          return this.formArrayBuilder.createFormField(parentPath, parentModel, <FormArrayTemplate>template);
        case 'control':
          return this.formControlBuilder.createFormField(parentPath, parentModel, <FormControlTemplate>template);
        default:
          return null;
      }
    });
  }

  private createFormGroupField(parentPath: string, parentModel: any, template: FormFieldTemplate): FormGroupField {
    const path = this.getPath(parentPath, template);
    const model = this.getModel(parentModel, template) || this.createModel(parentModel, template);
    return this.createFormField(path, model, <FormGroupTemplate>template);
  }

  private getFieldControls(fields: FormField[]) {
    return fields.reduce((result, field) => {
      result[field.template.key] = field.control;
      return result;
    }, {});
  }
}
