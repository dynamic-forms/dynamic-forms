import { Type } from '@angular/core';
import { DynamicFormWrapper } from './dynamic-form-wrapper';

export interface DynamicFormWrapperTypeConfig {
  type: string;
  component: Type<DynamicFormWrapper>;
}

export interface DynamicFormWrapperConfig {
  types: DynamicFormWrapperTypeConfig[];
}
