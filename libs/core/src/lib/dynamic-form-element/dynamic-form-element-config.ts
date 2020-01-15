import { InjectionToken, Type } from '@angular/core';
import { DynamicFormLibrary } from '../dynamic-form-config/dynamic-form-library';
import { DynamicFormElementBase } from './dynamic-form-element-base';

export interface DynamicFormElementType<Component extends DynamicFormElementBase = DynamicFormElementBase> {
  library?: DynamicFormLibrary;
  type: string;
  component: Type<Component>;
}

export type DynamicFormElementTypes = DynamicFormElementType[];

export const DYNAMIC_FORM_ELEMENT_TYPES = new InjectionToken<DynamicFormElementTypes>('DynamicFormElementTypes');

export interface DynamicFormElementConfig {
  types: DynamicFormElementType[];
}
