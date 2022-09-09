/* eslint-disable no-console */
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormLogLevel } from './dynamic-form-log-level';
import { DynamicFormLoggerType } from './dynamic-form-logger-type';

export const dynamicFormConsoleLogger: DynamicFormLoggerType = {
  type: 'dynamic-form-console-logger',
  libraryName: dynamicFormLibrary.name,
  enabled: true,
  log: (log) => {
    const message = `${log.type} error: ${log.message}:\n`;
    switch(log.level) {
      case DynamicFormLogLevel.Error:
        return console.error(message, ...log.data);
      case DynamicFormLogLevel.Warning:
        return console.warn(message, ...log.data);
      case DynamicFormLogLevel.Information:
        return console.info(message, ...log.data);
      case DynamicFormLogLevel.Debug:
        return console.debug(message, ...log.data);
    }
  },
};
