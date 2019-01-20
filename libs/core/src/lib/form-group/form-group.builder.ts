import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupTemplate, FormGroupField } from './form-group.model';
import { FormFieldTemplate, FormField, FormFieldData } from '../form-field/form-field.model';
import { FormFieldBuilder } from '../form-field/form-field.builder';
import { FormArrayTemplate } from '../form-array/form-array.model';
import { FormArrayBuilder } from '../form-array/form-array.builder';
import { FormControlTemplate } from '../form-control/form-control.model';
import { FormControlBuilder } from '../form-control/form-control.builder';
import { FormExpressionsBuilder } from '../form-expressions/form-expressions.builder';

@Injectable()
export class FormGroupBuilder extends FormFieldBuilder {
  constructor(
    private formArrayBuilder: FormArrayBuilder,
    private formControlBuilder: FormControlBuilder,
    protected expressionsBuilder: FormExpressionsBuilder) {
      super(expressionsBuilder);
    }

  createFormField(template: FormGroupTemplate, data: FormFieldData, path: string): FormGroupField {
    const fields = this.createFormFields(template.fields, path, data);
    const controls = this.getFieldControls(fields);
    const control = new FormGroup(controls);
    const expressions = this.getExpressions(template);
    return new FormGroupField(path, data, template, expressions, control, fields);
  }

  private createFormFields(templates: FormFieldTemplate[], parentPath: string, parentData: FormFieldData): FormField[] {
    return (templates || []).map(template => {
      switch (template.type) {
        case 'group':
          return this.createFormGroupField(template, parentPath, parentData);
        case 'array':
          return this.formArrayBuilder.createFormField(<FormArrayTemplate>template, parentData, parentPath);
        case 'control':
          return this.formControlBuilder.createFormField(<FormControlTemplate>template, parentData, parentPath);
        default:
          throw Error(`Type ${ template.type } is not defined`);
      }
    });
  }

  private createFormGroupField(template: FormFieldTemplate, parentPath: string, parentData: FormFieldData): FormGroupField {
    const path = this.getPath(template, parentPath);
    const data = this.getData(template, parentData);
    return this.createFormField(<FormGroupTemplate>template, data, path);
  }

  private getData(template: FormFieldTemplate, parentData: FormFieldData) {
    return {
      model: this.getModel(template, parentData, {}),
      parentModel: parentData.model,
      rootModel: parentData.rootModel
    };
  }

  private getFieldControls(fields: FormField[]) {
    return (fields || []).reduce((result, field) => {
      result[field.template.key] = field.control;
      return result;
    }, {});
  }

  private getExpressions(template: FormGroupTemplate) {
    return this.expressionsBuilder.createExpressions(template.expressions);
  }
}
