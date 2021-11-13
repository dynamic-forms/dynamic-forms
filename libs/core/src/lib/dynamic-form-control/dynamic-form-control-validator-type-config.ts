import { InjectionToken } from '@angular/core';
import { DynamicFormControlAsyncValidatorType, DynamicFormControlValidatorType } from './dynamic-form-control-validator-type';

export type DynamicFormControlValidatorTypeConfig = (
  DynamicFormControlValidatorType | DynamicFormControlAsyncValidatorType |
  (DynamicFormControlValidatorType | DynamicFormControlAsyncValidatorType)[]
)[];

export const DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG =
  new InjectionToken<DynamicFormControlValidatorTypeConfig>('DynamicFormControlValidatorTypeConfig');
