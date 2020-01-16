import { InjectionToken } from '@angular/core';
import { DynamicFormType } from '../dynamic-form-config/dynamic-form-type';
import { DynamicFormInputBase } from '../dynamic-form-input/dynamic-form-input-base';

export interface DynamicFormInputType extends DynamicFormType<DynamicFormInputBase> {
  wrappers?: string[];
}

export type DynamicFormInputTypes = DynamicFormInputType[];

export const DYNAMIC_FORM_INPUT_TYPES = new InjectionToken<DynamicFormInputTypes>('DynamicFormInputTypes');
