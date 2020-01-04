import { Type } from '@angular/core';
import { DynamicFormInputBase } from '../dynamic-form-input/dynamic-form-input-base';

export interface DynamicFormInputTypeConfig {
  type: string;
  component: Type<DynamicFormInputBase>;
  wrappers?: string[];
}

export interface DynamicFormInputConfig {
  types?: DynamicFormInputTypeConfig[];
}

export const dynamicFormInputConfig: DynamicFormInputConfig = {
  types: []
};
