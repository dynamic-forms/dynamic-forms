import { InjectionToken } from '@angular/core';
import { DynamicFormType } from '../dynamic-form-config/dynamic-form-type';
import { DynamicFormFieldWrapperBase } from './dynamic-form-field-wrapper-base';

export interface DynamicFormFieldWrapperType extends DynamicFormType<DynamicFormFieldWrapperBase>  {}

export type DynamicFormFieldWrapperTypes = DynamicFormFieldWrapperType[];

export const DYNAMIC_FORM_FIELD_WRAPPER_TYPES = new InjectionToken<DynamicFormFieldWrapperTypes>('DynamicFormFieldWrapperTypes');

export interface DynamicFormFieldWrapperConfig {
  types: DynamicFormFieldWrapperType[];
}
