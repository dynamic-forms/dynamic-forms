import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupTemplate, FormGroupField } from './form-group.model';
import { FormFieldTemplate, FormField, FormFieldData, FormFieldExpressions, FormControlType } from '../form-field/form-field.model';
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

  createFormField(_template: FormGroupTemplate, data: FormFieldData, path: string): FormGroupField {
    const expressions = this.createExpressions(_template, data);
    const template = this.createTemplate(_template, expressions);
    const fields = this.createFormFields(template.fields, path, data);
    const controls = this.getFieldControls(fields);
    const control = this.createControl(template, data, controls);
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
    const data = this.createData(template, parentData);
    return this.createFormField(<FormGroupTemplate>template, data, path);
  }

  private createData(template: FormFieldTemplate, parentData: FormFieldData) {
    return {
      model: this.createModel(template, parentData, {}),
      parentModel: parentData.model,
      rootModel: parentData.rootModel
    };
  }

  private getFieldControls(fields: FormField[]) {
    return (fields || []).reduce((result, field) => {
      result[field.template.key] = field.control;
      return result;
    }, <{ [key: string]: FormControlType }>{});
  }

  private createTemplate(template: FormGroupTemplate, expressions: FormFieldExpressions) {
    if (expressions) {
      Object.keys(expressions).forEach(key => {
        Object.defineProperty(template, key, { get: function() { return expressions[key].value; } });
      });
    }
    return template;
  }

  private createControl(template: FormGroupTemplate, data: FormFieldData, controls: { [key: string]: FormControlType }) {
    const control = new FormGroup(controls);
    control.valueChanges.subscribe(value => {
      // console.log(data.model, value);
      data.parentModel[template.key] = value;
      data.model = value;
    });
    return control;
  }
}
