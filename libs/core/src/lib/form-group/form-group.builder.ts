import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupTemplate, FormGroupField } from './form-group.model';
import { FormFieldTemplate, FormField, FormControlType } from '../form-field/form-field.model';
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
    const field = new FormGroupField(null, null, template, model);
    field.expressions = this.createExpressions(field);
    this.assignExpressions(field.template, field.expressions);
    field.fields = this.createFields(field, field, field.template.fields);
    field.control = this.createControl(field, this.getControls(field.fields));
    return field;
  }

  createField(root: FormField, parent: FormField, template: FormGroupTemplate, ): FormGroupField {
    const field = new FormGroupField(root, parent, template);
    field.expressions = this.createExpressions(field);
    this.assignExpressions(field.template, field.expressions);
    field.fields = this.createFields(root, field, template.fields);
    field.control = this.createControl(field, this.getControls(field.fields));
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

  private getControls(fields: FormField[]) {
    return (fields || []).reduce((result, field) => {
      result[field.template.key] = field.control;
      return result;
    }, <{ [key: string]: FormControlType }>{});
  }

  private createControl(field: FormField, controls: { [key: string]: FormControlType }) {
    const control = new FormGroup(controls);
    /*control.valueChanges.subscribe(value => {
      // console.log(data.model, value);
      field.parent.model[field.template.key] = value;
      field.model = value;
    });*/
    return control;
  }
}
