import { Type } from '@angular/core';
import { DynamicFormFieldWrapperBase } from './dynamic-form-field-wrapper-base';

export interface DynamicFormFieldWrapperTypeConfig {
  type: string;
  component: Type<DynamicFormFieldWrapperBase>;
}

export interface DynamicFormFieldWrapperConfig {
  types: DynamicFormFieldWrapperTypeConfig[];
}
