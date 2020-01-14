import { InjectionToken, Type } from '@angular/core';
import { DynamicFormInputBase } from '../dynamic-form-input/dynamic-form-input-base';

export interface DynamicFormInputType {
  type: string;
  component: Type<DynamicFormInputBase>;
  wrappers?: string[];
}

export type DynamicFormInputTypes = DynamicFormInputType[];

export const DYNAMIC_FORM_INPUT_TYPES = new InjectionToken<DynamicFormInputTypes>('DynamicFormInputTypes');

export interface DynamicFormInputConfig {
  types: DynamicFormInputType[];
}
