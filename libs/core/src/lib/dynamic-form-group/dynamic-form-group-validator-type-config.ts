import { InjectionToken } from '@angular/core';
import { DynamicFormGroupValidatorType } from './dynamic-form-group-validator-type';

export type DynamicFormGroupValidatorTypeConfig = (DynamicFormGroupValidatorType | DynamicFormGroupValidatorType[])[];

export const DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG =
  new InjectionToken<DynamicFormGroupValidatorTypeConfig>('DynamicFormGroupValidatorTypeConfig');
