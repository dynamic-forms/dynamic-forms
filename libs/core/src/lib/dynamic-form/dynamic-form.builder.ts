import { Injectable } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { DynamicForm } from './dynamic-form.model';
import { DynamicFormItem } from '../dynamic-form-item';
import { DynamicFormGroup } from '../dynamic-form-group';
import { DynamicFormArray } from '../dynamic-form-array';
import { DynamicFormControl } from '../dynamic-form-control';

@Injectable()
export class DynamicFormBuilder {
  createForm(template: DynamicForm, model: any): FormGroup {
    return this.createFormGroup(template.items, model);
  }

  private createFormGroup(items: DynamicFormItem[], model?: any): FormGroup {
    const controls = items.reduce((result, item) => {
      switch (item.type) {
        case 'group':
          const groupModel = model ? model[item.key] : null;
          result[item.key] = this.createFormGroup((<DynamicFormGroup>item).items, groupModel);
          return result;
        case 'array':
          const arrayModel = model ? model[item.key] : null;
          result[item.key] = this.createFormArray(<DynamicFormArray>item, arrayModel);
          return result;
        case 'control':
          const value = model ? model[item.key] : null;
          result[item.key] = this.createFormControl(<DynamicFormControl>item, value);
          return result;
        default:
          return result;
      }
    }, {});
    return new FormGroup(controls);
  }

  private createFormArray(_template: DynamicFormArray, model?: any): FormArray {
    return new FormArray(null);
  }

  private createFormControl(template: DynamicFormControl, value?: any): FormControl {
    return new FormControl(value);
  }
}
