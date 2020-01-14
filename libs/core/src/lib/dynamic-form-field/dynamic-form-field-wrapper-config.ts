import { InjectionToken, Type } from '@angular/core';
import { DynamicFormFieldWrapperBase } from './dynamic-form-field-wrapper-base';

export interface DynamicFormFieldWrapperType {
  type: string;
  component: Type<DynamicFormFieldWrapperBase>;
}

export type DynamicFormFieldWrapperTypes = DynamicFormFieldWrapperType[];

export const DYNAMIC_FORM_FIELD_WRAPPER_TYPES = new InjectionToken<DynamicFormFieldWrapperTypes>('DynamicFormFieldWrapperTypes');

export interface DynamicFormFieldWrapperConfig {
  types: DynamicFormFieldWrapperType[];
}
