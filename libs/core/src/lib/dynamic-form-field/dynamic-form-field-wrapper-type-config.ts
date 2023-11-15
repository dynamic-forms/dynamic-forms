import { InjectionToken } from '@angular/core';
import { DynamicFormFieldWrapperType } from './dynamic-form-field-wrapper-type';

export type DynamicFormFieldWrapperTypeConfig = (DynamicFormFieldWrapperType | DynamicFormFieldWrapperType[])[];

export const DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG = new InjectionToken<DynamicFormFieldWrapperTypeConfig>(
  'DynamicFormFieldWrapperTypeConfig',
);
