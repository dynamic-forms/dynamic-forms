import { Type } from '@angular/core';
import { FormFieldType } from './form-field-type';
import { FormFieldBase } from './form-field.base';

export interface FormFieldTypeConfig {
  type: FormFieldType;
  component: Type<FormFieldBase>;
}

export interface FormFieldConfig {
  types: FormFieldTypeConfig[];
}
