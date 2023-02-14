import { InjectionToken } from '@angular/core';
import { DynamicFormLoggerType } from './dynamic-form-logger-type';

export type DynamicFormLoggerTypeConfig = (DynamicFormLoggerType | DynamicFormLoggerType[])[];

export const DYNAMIC_FORM_LOGGER_TYPE_CONFIG = new InjectionToken<DynamicFormLoggerTypeConfig>('DynamicFormLoggerTypeConfig');
