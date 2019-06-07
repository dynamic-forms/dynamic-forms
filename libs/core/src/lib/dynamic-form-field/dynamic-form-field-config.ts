import { Type } from '@angular/core';
import { DynamicFormWrapperType } from '../dynamic-form-wrapper/dynamic-form-wrapper-type';
import { DynamicFormFieldType } from './dynamic-form-field-type';
import { DynamicFormFieldWrapper } from './dynamic-form-field-wrapper';

export interface DynamicFormFieldTypeConfig {
  type: DynamicFormFieldType;
  component: Type<DynamicFormFieldWrapper>;
  wrappers?: DynamicFormWrapperType[];
}

export interface DynamicFormFieldConfig {
  types: DynamicFormFieldTypeConfig[];
}
