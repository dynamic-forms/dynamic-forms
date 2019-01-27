import { Type } from '@angular/core';
import { FormFieldBase, FormFieldType } from './form-field.model';

export interface FormFieldTypeConfig {
  type: FormFieldType;
  component: Type<FormFieldBase>;
}

export interface FormFieldConfig {
  types: FormFieldTypeConfig[];
}
