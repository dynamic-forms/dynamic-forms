import { InjectionToken } from '@angular/core';
import { DynamicFormElementType } from '../dynamic-form-element/dynamic-form-element-config';
import { DynamicFormFieldWrapperBase } from './dynamic-form-field-wrapper-base';

export interface DynamicFormFieldWrapperType extends DynamicFormElementType<DynamicFormFieldWrapperBase>  {}

export type DynamicFormFieldWrapperTypes = DynamicFormFieldWrapperType[];

export const DYNAMIC_FORM_FIELD_WRAPPER_TYPES = new InjectionToken<DynamicFormFieldWrapperTypes>('DynamicFormFieldWrapperTypes');

export interface DynamicFormFieldWrapperConfig {
  types: DynamicFormFieldWrapperType[];
}
