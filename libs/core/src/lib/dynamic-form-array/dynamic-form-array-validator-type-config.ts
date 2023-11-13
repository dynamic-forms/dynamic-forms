import { InjectionToken } from '@angular/core';
import { DynamicFormArrayAsyncValidatorType, DynamicFormArrayValidatorType } from './dynamic-form-array-validator-type';

export type DynamicFormArrayValidatorTypeConfig = (
  | DynamicFormArrayValidatorType
  | DynamicFormArrayAsyncValidatorType
  | (DynamicFormArrayValidatorType | DynamicFormArrayAsyncValidatorType)[]
)[];

export const DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG = new InjectionToken<DynamicFormArrayValidatorTypeConfig>(
  'DynamicFormArrayValidatorTypeConfig',
);
