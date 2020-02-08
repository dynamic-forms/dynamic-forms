import { InjectionToken } from '@angular/core';
import { DynamicFormComponentType } from '../dynamic-form-config/dynamic-form-component-type';
import { DynamicFormFieldBase } from './dynamic-form-field-base';
import { DynamicFormFieldFactory } from './dynamic-form-field-factory';

export interface DynamicFormFieldType extends DynamicFormComponentType<DynamicFormFieldBase> {
  factory: DynamicFormFieldFactory;
  wrappers?: string[];
}

export type DynamicFormFieldTypes = DynamicFormFieldType[];

export const DYNAMIC_FORM_FIELD_TYPES = new InjectionToken<DynamicFormFieldTypes>('DynamicFormFieldTypes');
