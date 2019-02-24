import { Type } from '@angular/core';
import { DynamicFormWrapperType } from '../dynamic-form-wrapper/dynamic-form-wrapper-type';
import { DynamicFormFieldType } from './dynamic-form-field-type';
import { DynamicFormFieldBase } from './dynamic-form-field.base';

export interface DynamicFormFieldTypeConfig {
  type: DynamicFormFieldType;
  component: Type<DynamicFormFieldBase>;
  wrappers?: DynamicFormWrapperType[];
}

export interface DynamicFormFieldConfig {
  types: DynamicFormFieldTypeConfig[];
}
