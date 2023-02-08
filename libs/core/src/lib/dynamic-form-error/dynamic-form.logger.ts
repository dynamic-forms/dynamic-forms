import { Inject, Injectable, Optional } from '@angular/core';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormLogLevel } from './dynamic-form-log-level';
import { DynamicFormLoggerSettings, dynamicFormLoggerSettingsDefault, DYNAMIC_FORM_LOGGER_SETTINGS } from './dynamic-form-logger-settings';
import { DynamicFormLoggerType } from './dynamic-form-logger-type';
import { DynamicFormLoggerTypeConfig, DYNAMIC_FORM_LOGGER_TYPE_CONFIG } from './dynamic-form-logger-type-config';

@Injectable()
export class DynamicFormLogger {
  readonly loggerTypes: DynamicFormLoggerType[];

  constructor(
    private libraryService: DynamicFormLibraryService,
    @Optional() @Inject(DYNAMIC_FORM_LOGGER_TYPE_CONFIG)
    private loggerTypeConfig: DynamicFormLoggerTypeConfig,
    @Optional() @Inject(DYNAMIC_FORM_LOGGER_SETTINGS)
    readonly settings: DynamicFormLoggerSettings,
  ) {
    this.loggerTypes = this.libraryService.filterTypes(this.loggerTypeConfig);
    this.settings = this.settings || dynamicFormLoggerSettingsDefault;
  }

  error(type: string, message?: any, ...data: any[]): void {
    this.logForLevel(DynamicFormLogLevel.Error, type, message, ...data);
  }

  warning(type: string, message?: any, ...data: any[]): void {
    this.logForLevel(DynamicFormLogLevel.Warning, type, message, ...data);
  }

  information(type: string, message?: any, ...data: any[]): void {
    this.logForLevel(DynamicFormLogLevel.Information, type, message, ...data);
  }

  debug(type: string, message?: any, ...data: any[]): void {
    this.logForLevel(DynamicFormLogLevel.Debug, type, message, ...data);
  }

  private logEnabled(level: DynamicFormLogLevel): boolean {
    return this.settings.logLevel >= level;
  }

  private logForLevel(level: DynamicFormLogLevel, type: string, message?: any, ...data: any[]): void {
    if (this.logEnabled(level)) {
      const log = { timestamp: new Date(), level, type, message, data };
      this.loggerTypes.filter(f => f.enabled).forEach(logger => logger.log(log));
    }
  }
}
