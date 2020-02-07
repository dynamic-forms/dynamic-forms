import { InjectionToken } from '@angular/core';
import { DynamicFormClassFactory } from '../dynamic-form-config/dynamic-form-class-factory';
import { DynamicFormComponentType } from '../dynamic-form-config/dynamic-form-component-type';
import { DynamicFormField } from './dynamic-form-field';
import { DynamicFormFieldBase } from './dynamic-form-field-base';
import { DynamicFormFieldDefinition } from './dynamic-form-field-definition';

export interface DynamicFormFieldType<
  Definition extends DynamicFormFieldDefinition = DynamicFormFieldDefinition,
  Field extends DynamicFormField = DynamicFormField
> extends DynamicFormComponentType<DynamicFormFieldBase> {
  factory: DynamicFormClassFactory<Definition, Field>;
  wrappers?: string[];
}

export type DynamicFormFieldTypes = DynamicFormFieldType[];

export const DYNAMIC_FORM_FIELD_TYPES = new InjectionToken<DynamicFormFieldTypes>('DynamicFormFieldTypes');
