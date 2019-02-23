import { Type } from '@angular/core';
import { DynamicFormFieldWrapperType } from '../dynamic-form-field-wrapper/dynamic-form-field-wrapper-type';
import { DynamicFormFieldType } from './dynamic-form-field-type';
import { DynamicFormFieldBase } from './dynamic-form-field.base';

export interface DynamicFormFieldTypeConfig {
  type: DynamicFormFieldType;
  component: Type<DynamicFormFieldBase>;
  wrappers?: DynamicFormFieldWrapperType[];
}

export interface DynamicFormFieldConfig {
  types: DynamicFormFieldTypeConfig[];
}
