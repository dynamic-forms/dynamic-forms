import { Type } from '@angular/core';
import { FormFieldType } from './form-field.model';
import { FormGroupComponent } from '../form-group/form-group.component';
import { FormArrayComponent } from '../form-array/form-array.component';
import { FormControlComponent } from '../form-control/form-control.component';

export interface FormFieldTypeConfig {
  type: FormFieldType;
  component: Type<any>;
}

export interface FormFieldConfig {
  types: FormFieldTypeConfig[];
}

export const defaultFieldConfig: FormFieldConfig = {
  types: [
    { type: 'group', component: FormGroupComponent },
    { type: 'array', component: FormArrayComponent },
    { type: 'control', component: FormControlComponent }
  ]
};

