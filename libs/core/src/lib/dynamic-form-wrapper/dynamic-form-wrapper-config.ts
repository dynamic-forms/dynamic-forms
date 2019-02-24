import { Type } from '@angular/core';
import { DynamicFormWrapper } from './dynamic-form-wrapper';
import { DynamicFormWrapperType } from './dynamic-form-wrapper-type';

export interface DynamicFormWrapperTypeConfig {
  type: DynamicFormWrapperType;
  component: Type<DynamicFormWrapper>;
}

export interface DynamicFormWrapperConfig {
  types: DynamicFormWrapperTypeConfig[];
}
