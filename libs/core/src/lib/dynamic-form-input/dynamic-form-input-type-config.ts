import { InjectionToken } from '@angular/core';
import { DynamicFormInputType } from './dynamic-form-input-type';

export type DynamicFormInputTypeConfig = (DynamicFormInputType | DynamicFormInputType[])[];

export const DYNAMIC_FORM_INPUT_TYPE_CONFIG = new InjectionToken<DynamicFormInputTypeConfig>('DynamicFormInputTypeConfig');
