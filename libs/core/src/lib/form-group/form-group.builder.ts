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

  createForm(template: FormGroupTemplate, model: any): FormGroupField {
    const field = new FormGroupField(null, null, template);
    field.data = { model: model, parentModel: model, rootModel: model };
    field.expressions = this.createExpressions(template, field.data);
    field.template = this.createTemplate(field.template, field.expressions);
    field.fields = this.createFields(field, field, field.template.fields);
    field.control = this.createControl(field.template, field.data, this.getControls(field.fields));
    return field;
  }

  createField(root: FormField, parent: FormField, template: FormGroupTemplate, ): FormGroupField {
    const field = new FormGroupField(root, parent, template);
    field.data = this.createData(field.template, parent);
    field.expressions = this.createExpressions(field.template, field.data);
    field.template = this.createTemplate(field.template, field.expressions);
    field.fields = this.createFields(root, field, template.fields);
    field.control = this.createControl(template, parent.data, this.getControls(field.fields));
    return field;
  }

  private createFields(root: FormField, parent: FormField, templates: FormFieldTemplate[]): FormField[] {
    return (templates || []).map(template => {
      switch (template.type) {
        case 'group':
          return this.createField(root, parent, <FormGroupTemplate>template);
        case 'array':
          return this.formArrayBuilder.createField(root, parent, <FormArrayTemplate>template);
        case 'control':
          return this.formControlBuilder.createField(root, parent, <FormControlTemplate>template);
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
