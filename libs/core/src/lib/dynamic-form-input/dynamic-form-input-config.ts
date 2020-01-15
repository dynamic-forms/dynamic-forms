import { InjectionToken, Type } from '@angular/core';
import { DynamicFormElementType } from '../dynamic-form-element/dynamic-form-element-config';
import { DynamicFormInputBase } from '../dynamic-form-input/dynamic-form-input-base';

export interface DynamicFormInputType extends DynamicFormElementType<DynamicFormInputBase> {
  wrappers?: string[];
}

export type DynamicFormInputTypes = DynamicFormInputType[];

export const DYNAMIC_FORM_INPUT_TYPES = new InjectionToken<DynamicFormInputTypes>('DynamicFormInputTypes');

export interface DynamicFormInputConfig {
  types: DynamicFormInputType[];
}
