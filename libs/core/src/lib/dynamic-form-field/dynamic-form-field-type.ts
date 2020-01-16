import { InjectionToken } from '@angular/core';
import { DynamicFormType } from '../dynamic-form-config/dynamic-form-type';
import { DynamicFormFieldBase } from './dynamic-form-field-base';

export interface DynamicFormFieldType extends DynamicFormType<DynamicFormFieldBase> {
  wrappers?: string[];
}

export type DynamicFormFieldTypes = DynamicFormFieldType[];

export const DYNAMIC_FORM_FIELD_TYPES = new InjectionToken<DynamicFormFieldTypes>('DynamicFormFieldTypes');
