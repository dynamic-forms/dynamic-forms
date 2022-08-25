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

  error(message?: any, ...data: any[]): void {
    this.logForLevel(DynamicFormLogLevel.Error, message, ...data);
  }

  warn(message?: any, ...data: any[]): void {
    this.logForLevel(DynamicFormLogLevel.Warn, message, ...data);
  }

  info(message?: any, ...data: any[]): void {
    this.logForLevel(DynamicFormLogLevel.Info, message, ...data);
  }

  debug(message?: any, ...data: any[]): void {
    this.logForLevel(DynamicFormLogLevel.Debug, message, ...data);
  }

  private logEnabled(logLevel: DynamicFormLogLevel): boolean {
    return this.settings.logLevel > logLevel;
  }

  private logForLevel(logLevel: DynamicFormLogLevel, message?: any, ...data: any[]): void {
    if (this.logEnabled(logLevel)) {
      this.loggerTypes.filter(f => f.enabled).forEach(logger => logger.log(logLevel, message, ...data));
    }
  }
}
