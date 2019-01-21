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

  createForm(_template: FormGroupTemplate, model: any): FormGroupField {
    const data = { model: model, parentModel: model, rootModel: model };
    const expressions = this.createExpressions(_template, data);
    const template = this.createTemplate(_template, expressions);
    const field = new FormGroupField(null, null, data, template, expressions);

    field.fields = this.createFields(template.fields, field);
    field.control = this.createControl(template, data, this.getControls(field.fields));

    return field;
  }

  createField(_template: FormGroupTemplate, parent: FormField): FormGroupField {
    const path = this.getPath(_template, parent);
    const data = this.createData(_template, parent);
    const expressions = this.createExpressions(_template, parent.data);
    const template = this.createTemplate(_template, expressions);
    const field = new FormGroupField(parent, path, data, template, expressions, );

    field.fields = this.createFields(template.fields, field);
    field.control = this.createControl(template, parent.data, this.getControls(field.fields));

    return field;
  }

  private createFields(templates: FormFieldTemplate[], parent: FormField): FormField[] {
    return (templates || []).map(template => {
      switch (template.type) {
        case 'group':
          return this.createField(<FormGroupTemplate>template, parent);
        case 'array':
          return this.formArrayBuilder.createField(<FormArrayTemplate>template, parent);
        case 'control':
          return this.formControlBuilder.createField(<FormControlTemplate>template, parent);
        default:
          throw Error(`Type ${ template.type } is not defined`);
      }
    });
  }

  private createData(template: FormFieldTemplate, parent: FormField) {
    return {
      model: this.createModel(template, parent, {}),
      parentModel: parent.data.model,
      rootModel: parent.data.rootModel
    };
  }

  private getControls(fields: FormField[]) {
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
