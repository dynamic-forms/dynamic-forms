import { InjectionToken } from '@angular/core';
import { DynamicFormComponentType } from '../dynamic-form-config/dynamic-form-component-type';
import { DynamicFormElementBase } from './dynamic-form-element-base';

export interface DynamicFormElementType extends DynamicFormComponentType<DynamicFormElementBase> {}

export type DynamicFormElementTypes = DynamicFormElementType[];

export const DYNAMIC_FORM_ELEMENT_TYPES = new InjectionToken<DynamicFormElementTypes>('DynamicFormElementTypes');
