import { Provider } from '@angular/core';
import { DynamicFormsFeature } from '../dynamic-forms-feature';
import { dynamicFormConsoleLogger } from './dynamic-form-console.logger';
import { DYNAMIC_FORM_ERROR_SETTINGS, DynamicFormErrorSettings } from './dynamic-form-error-settings';
import { DynamicFormErrorHandler } from './dynamic-form-error.handler';
import { DYNAMIC_FORM_LOGGER_SETTINGS, DynamicFormLoggerSettings } from './dynamic-form-logger-settings';
import { DynamicFormLoggerType } from './dynamic-form-logger-type';
import { DYNAMIC_FORM_LOGGER_TYPE_CONFIG } from './dynamic-form-logger-type-config';
import { DynamicFormLogger } from './dynamic-form.logger';

export const dynamicFormErrorProviders: Provider[] = [
  DynamicFormErrorHandler,
  DynamicFormLogger,
  {
    provide: DYNAMIC_FORM_LOGGER_TYPE_CONFIG,
    useValue: dynamicFormConsoleLogger,
    multi: true,
  },
];

export function withDynamicFormErrorSettings(settings: DynamicFormErrorSettings): DynamicFormsFeature {
  const provider = { provide: DYNAMIC_FORM_ERROR_SETTINGS, useValue: settings };
  return { providers: [provider] };
}

export function withDynamicFormLoggerSettings(settings: DynamicFormLoggerSettings): DynamicFormsFeature {
  const provider = { provide: DYNAMIC_FORM_LOGGER_SETTINGS, useValue: settings };
  return { providers: [provider] };
}

export function withDynamicFormLoggerFactory(
  typeFactory: (...depTypes: any[]) => DynamicFormLoggerType,
  deps?: any[],
): DynamicFormsFeature {
  const provider = { provide: DYNAMIC_FORM_LOGGER_TYPE_CONFIG, useFactory: typeFactory, deps, multi: true };
  return { providers: [provider] };
}

export function withDynamicFormLoggers(...loggerTypes: DynamicFormLoggerType[]): DynamicFormsFeature {
  const providers = loggerTypes.map(loggerType => {
    return {
      provide: DYNAMIC_FORM_LOGGER_TYPE_CONFIG,
      useValue: loggerType,
      multi: true,
    };
  });
  return { providers };
}
