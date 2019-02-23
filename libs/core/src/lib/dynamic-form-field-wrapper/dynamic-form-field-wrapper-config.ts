import { Type } from '@angular/core';
import { DynamicFormFieldWrapper } from './dynamic-form-field-wrapper';
import { DynamicFormFieldWrapperType } from './dynamic-form-field-wrapper-type';

export interface DynamicFormFieldWrapperTypeConfig {
  type: DynamicFormFieldWrapperType;
  component: Type<DynamicFormFieldWrapper>;
}

export interface DynamicFormFieldWrapperConfig {
  types: DynamicFormFieldWrapperTypeConfig[];
}
