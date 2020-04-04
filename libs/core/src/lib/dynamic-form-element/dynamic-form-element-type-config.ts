import { InjectionToken } from '@angular/core';
import { DynamicFormElementType } from './dynamic-form-element-type';

export type DynamicFormElementTypeConfig = (DynamicFormElementType | DynamicFormElementType[])[];

export const DYNAMIC_FORM_ELEMENT_TYPE_CONFIG = new InjectionToken<DynamicFormElementTypeConfig>('DynamicFormElementTypeConfig');
