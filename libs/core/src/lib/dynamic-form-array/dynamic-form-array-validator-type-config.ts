import { InjectionToken } from '@angular/core';
import { DynamicFormArrayValidatorType } from './dynamic-form-array-validator-type';

export type DynamicFormArrayValidatorTypeConfig = (DynamicFormArrayValidatorType | DynamicFormArrayValidatorType[])[];

export const DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG =
  new InjectionToken<DynamicFormArrayValidatorTypeConfig>('DynamicFormArrayValidatorTypeConfig');
