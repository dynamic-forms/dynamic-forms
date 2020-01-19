import { InjectionToken } from '@angular/core';
import { DynamicFormComponentType } from '../dynamic-form-config/dynamic-form-component-type';
import { DynamicFormFieldWrapperBase } from './dynamic-form-field-wrapper-base';

export interface DynamicFormFieldWrapperType extends DynamicFormComponentType<DynamicFormFieldWrapperBase>  {}

export type DynamicFormFieldWrapperTypes = DynamicFormFieldWrapperType[];

export const DYNAMIC_FORM_FIELD_WRAPPER_TYPES = new InjectionToken<DynamicFormFieldWrapperTypes>('DynamicFormFieldWrapperTypes');
