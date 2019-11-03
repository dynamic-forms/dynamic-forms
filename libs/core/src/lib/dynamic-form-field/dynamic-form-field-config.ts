import { Type } from '@angular/core';
import { DynamicFormFieldWrapper } from './dynamic-form-field-wrapper';

export interface DynamicFormFieldTypeConfig {
  type: string;
  component: Type<DynamicFormFieldWrapper>;
  wrappers?: string[];
}

export interface DynamicFormFieldConfig {
  types: DynamicFormFieldTypeConfig[];
}
