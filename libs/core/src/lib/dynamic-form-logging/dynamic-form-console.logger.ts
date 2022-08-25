/* eslint-disable no-console */
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormLogLevel } from './dynamic-form-log-level';
import { DynamicFormLoggerType } from './dynamic-form-logger-type';

export const dynamicFormConsoleLogger: DynamicFormLoggerType = {
  type: 'dynamic-form-console-logger',
  libraryName: dynamicFormLibrary.name,
  enabled: true,
  log: (logLevel: DynamicFormLogLevel, message?: any, ...data: any[]) => {
    switch(logLevel) {
      case DynamicFormLogLevel.Error:
        return console.error(message, ...data);
      case DynamicFormLogLevel.Warn:
        return console.warn(message, ...data);
      case DynamicFormLogLevel.Info:
        return console.info(message, ...data);
      case DynamicFormLogLevel.Debug:
        return console.debug(message, ...data);
    }
  },
};
