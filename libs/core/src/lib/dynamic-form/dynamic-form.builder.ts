import { Injectable } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { DynamicForm } from './dynamic-form.model';
import { DynamicFormItem, DynamicFormField } from '../dynamic-form-item';
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
          result[item.key] = this.createFormGroup((<DynamicFormGroup>item).items);
          return result;
        case 'array':
          result[item.key] = this.createFormArray(<DynamicFormArray>item);
          return result;
        case 'control':
          result[item.key] = this.createFormControl(<DynamicFormControl>item);
          return result;
        default:
          return result;
      }
    }, {});
    return new FormGroup(controls);
  }

  private createFormArray(_template: DynamicFormArray): FormArray {
    return new FormArray(null);
  }

  private createFormControl(_template: DynamicFormControl): FormControl {
    return new FormControl();
  }
}
