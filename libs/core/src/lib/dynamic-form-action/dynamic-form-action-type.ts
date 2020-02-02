import { InjectionToken } from '@angular/core';
import { DynamicFormComponentType } from '../dynamic-form-config/dynamic-form-component-type';
import { DynamicFormActionBase } from './dynamic-form-action-base';

export interface DynamicFormActionType extends DynamicFormComponentType<DynamicFormActionBase> {}

export type DynamicFormActionTypes = DynamicFormActionType[];

export const DYNAMIC_FORM_ACTION_TYPES = new InjectionToken<DynamicFormActionTypes>('DynamicFormActionTypes');
