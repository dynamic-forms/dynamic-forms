import { InjectionToken, Type } from '@angular/core';
import { DynamicFormElementBase } from './dynamic-form-element-base';

export interface DynamicFormElementType {
  type: string;
  component: Type<DynamicFormElementBase>;
}

export type DynamicFormElementTypes = DynamicFormElementType[];

export const DYNAMIC_FORM_ELEMENT_TYPES = new InjectionToken<DynamicFormElementTypes>('DynamicFormElementTypes');

export interface DynamicFormElementConfig {
  types: DynamicFormElementType[];
}
