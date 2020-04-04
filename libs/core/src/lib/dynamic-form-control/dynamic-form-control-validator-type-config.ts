import { InjectionToken } from '@angular/core';
import { DynamicFormControlValidatorType } from './dynamic-form-control-validator-type';

export type DynamicFormControlValidatorTypeConfig = (DynamicFormControlValidatorType | DynamicFormControlValidatorType[])[];

export const DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG =
  new InjectionToken<DynamicFormControlValidatorTypeConfig>('DynamicFormControlValidatorTypeConfig');
