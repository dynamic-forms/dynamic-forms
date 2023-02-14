import { ModuleWithProviders, NgModule } from '@angular/core';
import { dynamicFormConsoleLogger } from './dynamic-form-console.logger';
import { DynamicFormErrorSettings, DYNAMIC_FORM_ERROR_SETTINGS } from './dynamic-form-error-settings';
import { DynamicFormErrorHandler } from './dynamic-form-error.handler';
import { DynamicFormLoggerSettings, DYNAMIC_FORM_LOGGER_SETTINGS } from './dynamic-form-logger-settings';
import { DynamicFormLoggerType } from './dynamic-form-logger-type';
import { DYNAMIC_FORM_LOGGER_TYPE_CONFIG } from './dynamic-form-logger-type-config';
import { DynamicFormLogger } from './dynamic-form.logger';

@NgModule({
  providers: [
    DynamicFormErrorHandler,
    DynamicFormLogger,
    {
      provide: DYNAMIC_FORM_LOGGER_TYPE_CONFIG,
      useValue: dynamicFormConsoleLogger,
      multi: true,
    },
  ],
})
export class DynamicFormErrorModule {
  static withErrorSettings(settings: DynamicFormErrorSettings): ModuleWithProviders<DynamicFormErrorModule> {
    return {
      ngModule: DynamicFormErrorModule,
      providers: [
        {
          provide: DYNAMIC_FORM_ERROR_SETTINGS,
          useValue: settings,
        },
      ],
    };
  }

  static withLoggerSettings(settings: DynamicFormLoggerSettings): ModuleWithProviders<DynamicFormErrorModule> {
    return {
      ngModule: DynamicFormErrorModule,
      providers: [
        {
          provide: DYNAMIC_FORM_LOGGER_SETTINGS,
          useValue: settings,
        },
      ],
    };
  }

  static withLogger(loggerType: DynamicFormLoggerType): ModuleWithProviders<DynamicFormErrorModule> {
    return {
      ngModule: DynamicFormErrorModule,
      providers: [
        {
          provide: DYNAMIC_FORM_LOGGER_TYPE_CONFIG,
          useValue: loggerType,
          multi: true,
        },
      ],
    };
  }

  static withLoggers(loggerTypes: DynamicFormLoggerType[]): ModuleWithProviders<DynamicFormErrorModule> {
    return {
      ngModule: DynamicFormErrorModule,
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
