import { InjectionToken } from '@angular/core';
import { DynamicFormControlEvaluatorType } from './dynamic-form-control-evaluator-type';

export type DynamicFormControlEvaluatorTypeConfig = (DynamicFormControlEvaluatorType | DynamicFormControlEvaluatorType[])[];

export const DYNAMIC_FORM_CONTROL_EVALUATOR_TYPE_CONFIG = new InjectionToken<DynamicFormControlEvaluatorTypeConfig>(
  'DynamicFormControlEvaluatorTypeConfig',
);
