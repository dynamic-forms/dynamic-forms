import { Injectable } from '@angular/core';
import { FormArrayTemplate } from './../form-array/form-array-template';
import { FormArrayBuilder } from './../form-array/form-array.builder';
import { FormControlTemplate } from './../form-control/form-control-template';
import { FormControlBuilder } from './../form-control/form-control.builder';
import { FormField } from './../form-field/form-field';
import { FormFieldTemplate } from './../form-field/form-field-template';
import { FormFieldBuilder } from './../form-field/form-field.builder';
import { FormGroupField } from './form-group-field';
import { FormGroupTemplate } from './form-group-template';

@Injectable()
export class FormGroupBuilder extends FormFieldBuilder<FormGroupTemplate, FormGroupField> {
  constructor(
    private formArrayBuilder: FormArrayBuilder,
    private formControlBuilder: FormControlBuilder
  ) {
      super();
  }

  createForm(template: FormGroupTemplate, model: any) {
    const field = new FormGroupField(null, null, template, model);
    field.setExpressions(this.createExpressions(field));
    field.setFields(this.createFields(field, field, field.template.fields));
    return field;
  }

  createField(root: FormField, parent: FormField, template: FormGroupTemplate) {
    const field = new FormGroupField(root, parent, template);
    field.setExpressions(this.createExpressions(field));
    field.setFields(this.createFields(root, field, template.fields));
    return field;
  }

  private createFields(root: FormField, parent: FormField, templates: FormFieldTemplate[]) {
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
}
