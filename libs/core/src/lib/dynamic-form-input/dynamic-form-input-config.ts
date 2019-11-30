import { Type } from '@angular/core';
import { DynamicFormInputBase } from '../dynamic-form-input/dynamic-form-input-base';

export interface DynamicFormInputType {
  type: string;
  component: Type<DynamicFormInputBase>;
  wrappers?: string[];
}

export interface DynamicFormInputConfig {
  types?: DynamicFormInputType[];
}

export const dynamicFormInputConfig: DynamicFormInputConfig = {
  types: []
};
