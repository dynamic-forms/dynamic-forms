import { Type } from '@angular/core';
import { FormFieldBase } from './../form-field.base';
import { FormFieldType } from './form-field-type';

export interface FormFieldTypeConfig {
  type: FormFieldType;
  component: Type<FormFieldBase>;
}

export interface FormFieldConfig {
  types: FormFieldTypeConfig[];
}
