import { InjectionToken } from '@angular/core';
import { DynamicFormGroupAsyncValidatorType, DynamicFormGroupValidatorType } from './dynamic-form-group-validator-type';

export type DynamicFormGroupValidatorTypeConfig = (
  | DynamicFormGroupValidatorType
  | DynamicFormGroupAsyncValidatorType
  | (DynamicFormGroupValidatorType | DynamicFormGroupAsyncValidatorType)[]
)[];

export const DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG = new InjectionToken<DynamicFormGroupValidatorTypeConfig>(
  'DynamicFormGroupValidatorTypeConfig',
);
