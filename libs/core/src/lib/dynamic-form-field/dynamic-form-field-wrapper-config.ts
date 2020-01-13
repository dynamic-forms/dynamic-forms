import { Type } from '@angular/core';
import { DynamicFormFieldWrapperBase } from './dynamic-form-field-wrapper-base';

export interface DynamicFormFieldWrapperType {
  type: string;
  component: Type<DynamicFormFieldWrapperBase>;
}

export interface DynamicFormFieldWrapperConfig {
  types: DynamicFormFieldWrapperType[];
}

export const dynamicFormWrapperConfig: DynamicFormFieldWrapperConfig = {
  types: []
};
