import { InjectionToken } from '@angular/core';
import { DynamicFormComponentType } from '../dynamic-form-config/dynamic-form-component-type';
import { DynamicFormInputBase } from '../dynamic-form-input/dynamic-form-input-base';

export interface DynamicFormInputType extends DynamicFormComponentType<DynamicFormInputBase> {
  wrappers?: string[];
}

export type DynamicFormInputTypes = DynamicFormInputType[];

export const DYNAMIC_FORM_INPUT_TYPES = new InjectionToken<DynamicFormInputTypes>('DynamicFormInputTypes');
