import { InjectionToken } from '@angular/core';
import { DynamicFormType } from '../dynamic-form-config/dynamic-form-type';
import { DynamicFormElementBase } from './dynamic-form-element-base';

export interface DynamicFormElementType extends DynamicFormType<DynamicFormElementBase> {}

export type DynamicFormElementTypes = DynamicFormElementType[];

export const DYNAMIC_FORM_ELEMENT_TYPES = new InjectionToken<DynamicFormElementTypes>('DynamicFormElementTypes');

export interface DynamicFormElementConfig {
  types: DynamicFormElementType[];
}
