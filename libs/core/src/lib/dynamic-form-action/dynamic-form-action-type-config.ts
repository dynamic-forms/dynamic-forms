import { InjectionToken } from '@angular/core';
import { DynamicFormActionType } from './dynamic-form-action-type';

export type DynamicFormActionTypeConfig = (DynamicFormActionType | DynamicFormActionType[])[];

export const DYNAMIC_FORM_ACTION_TYPE_CONFIG = new InjectionToken<DynamicFormActionTypeConfig>('DynamicFormActionTypeConfig');
