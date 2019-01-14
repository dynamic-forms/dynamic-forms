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
    const fields = this.createFormFields(template.items, model);
    const controls = this.getFieldControls(fields);
    const control = new FormGroup(controls);
    return { template, control,  model, fields };
  }

  private createFormFields(templates: FormFieldTemplate[], model?: any): FormField[] {
    return templates.map(template => {
      switch (template.type) {
        case 'group':
          const groupModel = model ? model[template.key] : null;
          return this.createFormGroupField(<FormGroupTemplate>template, groupModel);
        case 'array':
          const arrayModel = model ? model[template.key] : null;
          return this.createFormArrayField(<FormArrayTemplate>template, arrayModel);
        case 'control':
          const controlModel = model ? model[template.key] : null;
          return this.createFormControlField(<FormControlTemplate>template, controlModel);
        default:
          return null;
      }
    });
  }

  private createFormGroupField(template: FormGroupTemplate, model?: any): FormField {
    return this.createFormField(template, model);
  }

  private createFormArrayField(template: FormArrayTemplate, model?: any): FormField {
    const control = new FormArray(model);
    return { template, control, model };
  }

  private createFormControlField(template: FormControlTemplate, model?: any): FormField {
    const control = new FormControl(model);
    return { template, control, model };
  }

  private getFieldControls(fields: FormField[]) {
    return fields.reduce((result, item) => {
      result[item.template.key] = item.control;
      return result;
    }, {});
  }
}
