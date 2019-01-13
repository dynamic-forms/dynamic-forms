import { Injectable } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { DynamicForm } from './dynamic-form.model';
import { DynamicFormItem, DynamicFormField } from '../dynamic-form-item';
import { DynamicFormGroup } from '../dynamic-form-group';
import { DynamicFormArray } from '../dynamic-form-array';
import { DynamicFormControl } from '../dynamic-form-control';

@Injectable()
export class DynamicFormBuilder {
  createFormField(template: DynamicForm, model: any): DynamicFormField {
    const fields = this.createFormFields(template.items, model);
    const controls = this.getFieldControls(fields);
    const control = new FormGroup(controls);
    return { template, control,  model, fields };
  }

  private createFormFields(items: DynamicFormItem[], model?: any): DynamicFormField[] {
    return items.map(item => {
      switch (item.type) {
        case 'group':
          const groupModel = model ? model[item.key] : null;
          return this.createFormGroupField(<DynamicFormGroup>item, groupModel);
        case 'array':
          const arrayModel = model ? model[item.key] : null;
          return this.createFormArrayField(<DynamicFormArray>item, arrayModel);
        case 'control':
          const value = model ? model[item.key] : null;
          return this.createFormControlField(<DynamicFormControl>item, value);
        default:
          return null;
      }
    });
  }

  private createFormGroupField(item: DynamicFormGroup, model?: any): DynamicFormField {
    return this.createFormField(item, model);
  }

  private createFormArrayField(template: DynamicFormArray, model?: any): DynamicFormField {
    const control = this.createFormArray(template, model);
    return { template, control, model };
  }

  private createFormControlField(template: DynamicFormControl, model?: any): DynamicFormField {
    const control = this.createFormControl(template, model);
    return { template, control, model };
  }

  private getFieldControls(fields: DynamicFormField[]) {
    return fields.reduce((result, item) => {
      result[item.template.key] = item.control;
      return result;
    }, {});
  }

  private createFormArray(_template: DynamicFormArray, model?: any): FormArray {
    return new FormArray(model);
  }

  private createFormControl(_template: DynamicFormControl, model?: any): FormControl {
    return new FormControl(model);
  }
}
