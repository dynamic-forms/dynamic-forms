import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupTemplate, FormGroupField } from './form-group.model';
import { FormFieldBuilder, FormFieldTemplate, FormField } from '../form-field';
import { FormArrayBuilder, FormArrayTemplate } from '../form-array';
import { FormControlBuilder, FormControlTemplate } from '../form-control';

@Injectable()
export class FormGroupBuilder extends FormFieldBuilder {
  constructor(
    private formArrayBuilder: FormArrayBuilder,
    private formControlBuilder: FormControlBuilder) {
      super();
    }

  createFormField(template: FormGroupTemplate, path: string, model: any): FormGroupField {
    const fields = this.createFormFields(template.fields, path, model);
    const controls = this.getFieldControls(fields);
    const control = new FormGroup(controls);
    return new FormGroupField(path, template, control, model, fields);
  }

  private createFormFields(templates: FormFieldTemplate[], parentPath: string, parentModel: any): FormField[] {
    return templates.map(template => {
      switch (template.type) {
        case 'group':
          return this.createFormGroupField(template, parentPath, parentModel);
        case 'array':
          return this.formArrayBuilder.createFormField(<FormArrayTemplate>template, parentPath, parentModel);
        case 'control':
          return this.formControlBuilder.createFormField(<FormControlTemplate>template, parentPath, parentModel);
        default:
          return null;
      }
    });
  }

  private createFormGroupField(template: FormFieldTemplate, parentPath: string, parentModel: any): FormGroupField {
    const path = this.getPath(template, parentPath);
    const model = this.getModel(template, parentModel);
    return this.createFormField(<FormGroupTemplate>template, path, model);
  }

  private getFieldControls(fields: FormField[]) {
    return fields.reduce((result, field) => {
      result[field.template.key] = field.control;
      return result;
    }, {});
  }
}
