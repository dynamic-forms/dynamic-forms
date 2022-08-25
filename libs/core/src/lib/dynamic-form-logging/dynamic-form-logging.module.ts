import { ModuleWithProviders, NgModule } from '@angular/core';
import { dynamicFormConsoleLogger } from './dynamic-form-console.logger';
import { DynamicFormLoggerSettings, DYNAMIC_FORM_LOGGER_SETTINGS } from './dynamic-form-logger-settings';
import { DynamicFormLoggerType } from './dynamic-form-logger-type';
import { DYNAMIC_FORM_LOGGER_TYPE_CONFIG } from './dynamic-form-logger-type-config';
import { DynamicFormLogger } from './dynamic-form.logger';

@NgModule({
  providers: [
    DynamicFormLogger,
    {
      provide: DYNAMIC_FORM_LOGGER_TYPE_CONFIG,
      useValue: dynamicFormConsoleLogger,
      multi: true,
    },
  ],
})
export class DynamicFormLoggingModule {
  static withLoggerSettings(settings: DynamicFormLoggerSettings): ModuleWithProviders<DynamicFormLoggingModule> {
    return {
      ngModule: DynamicFormLoggingModule,
      providers: [
        {
          provide: DYNAMIC_FORM_LOGGER_SETTINGS,
          useValue: settings,
        },
      ],
    };
  }

  static withLogger(loggerType: DynamicFormLoggerType): ModuleWithProviders<DynamicFormLoggingModule> {
    return {
      ngModule: DynamicFormLoggingModule,
      providers: [
        {
          provide: DYNAMIC_FORM_LOGGER_TYPE_CONFIG,
          useValue: loggerType,
          multi: true,
        },
      ],
    };
  }

  static withLoggers(loggerTypes: DynamicFormLoggerType[]): ModuleWithProviders<DynamicFormLoggingModule> {
    return {
      ngModule: DynamicFormLoggingModule,
      providers: [
        {
          provide: DYNAMIC_FORM_LOGGER_TYPE_CONFIG,
          useValue: loggerTypes,
          multi: true,
        },
      ],
    };
  }
}
