import { Inject, Injectable, Optional } from '@angular/core';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormLogLevel } from './dynamic-form-log-level';
import { DynamicFormLogType } from './dynamic-form-log-type';
import { DYNAMIC_FORM_LOGGER_SETTINGS, DynamicFormLoggerSettings, dynamicFormLoggerSettingsDefault } from './dynamic-form-logger-settings';
import { DynamicFormLoggerType } from './dynamic-form-logger-type';
import { DYNAMIC_FORM_LOGGER_TYPE_CONFIG, DynamicFormLoggerTypeConfig } from './dynamic-form-logger-type-config';

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

  error<LogType extends DynamicFormLogType = DynamicFormLogType>(type: LogType, message?: string, ...data: any[]): void {
    this.logForLevel(DynamicFormLogLevel.Error, type, message, ...data);
  }

  warning<LogType extends DynamicFormLogType = DynamicFormLogType>(type: LogType, message?: string, ...data: any[]): void {
    this.logForLevel(DynamicFormLogLevel.Warning, type, message, ...data);
  }

  information<LogType extends DynamicFormLogType = DynamicFormLogType>(type: LogType, message?: string, ...data: any[]): void {
    this.logForLevel(DynamicFormLogLevel.Information, type, message, ...data);
  }

  debug<LogType extends DynamicFormLogType = DynamicFormLogType>(type: LogType, message?: string, ...data: any[]): void {
    this.logForLevel(DynamicFormLogLevel.Debug, type, message, ...data);
  }

  private logEnabled(level: DynamicFormLogLevel): boolean {
    return this.settings.logLevel >= level;
  }

  private logForLevel<LogType extends DynamicFormLogType = DynamicFormLogType>(
    level: DynamicFormLogLevel, type: LogType, message?: string, ...data: any[]
  ): void {
    if (this.logEnabled(level)) {
      const log = { timestamp: new Date(), level, type, message, data };
      this.loggerTypes.filter(f => f.enabled).forEach(logger => logger.log(log));
    }
  }
}
