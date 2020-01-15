import { InjectionToken } from '@angular/core';
import { DynamicFormElementType } from '../dynamic-form-element/dynamic-form-element-config';
import { DynamicFormFieldBase } from './dynamic-form-field-base';

export interface DynamicFormFieldType extends DynamicFormElementType<DynamicFormFieldBase> {
  wrappers?: string[];
}

export type DynamicFormFieldTypes = DynamicFormFieldType[];

export const DYNAMIC_FORM_FIELD_TYPES = new InjectionToken<DynamicFormFieldTypes>('DynamicFormFieldTypes');

export interface DynamicFormFieldConfig {
  types: DynamicFormFieldType[];
}
