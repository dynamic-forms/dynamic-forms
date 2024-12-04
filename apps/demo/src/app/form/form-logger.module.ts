import { NgModule, Provider } from '@angular/core';
import { DYNAMIC_FORM_LOGGER_TYPE_CONFIG, DynamicFormLog, DynamicFormLoggerType, dynamicFormLibrary } from '@dynamic-forms/core';
import { FormLogger } from './form-logger';

export const formLoggerTypeFactory: (logger: FormLogger) => DynamicFormLoggerType = logger => {
  return {
    type: 'dynamic-form-logger',
    libraryName: dynamicFormLibrary.name,
    enabled: true,
    log: (log: DynamicFormLog) => logger.log(log),
  };
};

export const formLoggerProviders: Provider[] = [
  FormLogger,
  {
    provide: DYNAMIC_FORM_LOGGER_TYPE_CONFIG,
    useFactory: formLoggerTypeFactory,
    deps: [FormLogger],
    multi: true,
  },
];

@NgModule({ providers: formLoggerProviders })
export class FormLoggerModule {}
