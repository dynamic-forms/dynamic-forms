import { InjectionToken } from '@angular/core';
import { DynamicFormFieldType } from './dynamic-form-field-type';

export type DynamicFormFieldTypeConfig = (DynamicFormFieldType | DynamicFormFieldType[])[];

export const DYNAMIC_FORM_FIELD_TYPE_CONFIG = new InjectionToken<DynamicFormFieldTypeConfig>('DynamicFormFieldTypeConfig');
