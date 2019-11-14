import { Type } from '@angular/core';
import { DynamicFormElementWrapper } from './dynamic-form-element-wrapper';

export interface DynamicFormElementTypeConfig {
  type: string;
  component: Type<DynamicFormElementWrapper>;
}

export interface DynamicFormElementConfig {
  types: DynamicFormElementTypeConfig[];
}
