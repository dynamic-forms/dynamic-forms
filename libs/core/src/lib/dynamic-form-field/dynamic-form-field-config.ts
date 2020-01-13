import { Type } from '@angular/core';
import { DynamicFormFieldBase } from './dynamic-form-field-base';

export interface DynamicFormFieldType {
  type: string;
  component: Type<DynamicFormFieldBase>;
  wrappers?: string[];
}

export interface DynamicFormFieldConfig {
  types: DynamicFormFieldType[];
}
