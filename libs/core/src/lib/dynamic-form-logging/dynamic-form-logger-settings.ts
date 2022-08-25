import { InjectionToken } from '@angular/core';
import { DynamicFormLogLevel } from './dynamic-form-log-level';

export interface DynamicFormLoggerSettings {
  logLevel: DynamicFormLogLevel;
}

export const DYNAMIC_FORM_LOGGER_SETTINGS = new InjectionToken<DynamicFormLoggerSettings>('DynamicFormLoggerSettings');

export const dynamicFormLoggerSettingsDefault: DynamicFormLoggerSettings = {
  logLevel: DynamicFormLogLevel.Debug,
};
