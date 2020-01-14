import { InjectionToken, Type } from '@angular/core';
import { DynamicFormFieldBase } from './dynamic-form-field-base';

export interface DynamicFormFieldType {
  type: string;
  component: Type<DynamicFormFieldBase>;
  wrappers?: string[];
}

export type DynamicFormFieldTypes = DynamicFormFieldType[];

export const DYNAMIC_FORM_FIELD_TYPES = new InjectionToken<DynamicFormFieldTypes>('DynamicFormFieldTypes');

export interface DynamicFormFieldConfig {
  types: DynamicFormFieldType[];
}
