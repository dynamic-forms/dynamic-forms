import { Injectable } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { FormTemplate } from './form.model';
import { FormField, FormFieldTemplate } from '../form-field';
import { FormGroupTemplate } from '../form-group';
import { FormArrayTemplate } from '../form-array';
import { FormControlTemplate } from '../form-control';

@Injectable()
export class FormBuilder {
  createFormField(template: FormTemplate, model: any): FormField {
    const fields = this.createFormFields(template.fields, model);
    const controls = this.getFieldControls(fields);
    const control = new FormGroup(controls);
    return { template, control,  model, fields };
  }

  private createFormFields(templates: FormFieldTemplate[], model: any): FormField[] {
    return templates.map(template => {
      switch (template.type) {
        case 'group':
          return this.createFormGroupField(<FormGroupTemplate>template, model);
        case 'array':

          return this.createFormArrayField(<FormArrayTemplate>template, model);
        case 'control':
          return this.createFormControlField(<FormControlTemplate>template, model);
        default:
          return null;
      }
    });
  }

  private createFormGroupField(template: FormGroupTemplate, parentModel: any): FormField {
    const model = parentModel ? parentModel[template.key] : null;
    return this.createFormField(template, model);
  }

  private createFormArrayField(template: FormArrayTemplate, parentModel: any): FormField {
    const model = parentModel ? parentModel[template.key] : null;
    const control = new FormArray(model);
    return { template, control, model };
  }

  private createFormControlField(template: FormControlTemplate, parentModel: any): FormField {
    const model = parentModel ? parentModel[template.key] : null;
    const control = new FormControl(model);
    return { template, control, model };
  }

  private getFieldControls(fields: FormField[]) {
    return fields.reduce((result, field) => {
      result[field.template.key] = field.control;
      return result;
    }, {});
  }
}
