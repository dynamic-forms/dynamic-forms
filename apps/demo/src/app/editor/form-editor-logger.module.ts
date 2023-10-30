import { NgModule } from '@angular/core';
import { DYNAMIC_FORM_LOGGER_TYPE_CONFIG, DynamicFormLog, DynamicFormLoggerType, dynamicFormLibrary } from '@dynamic-forms/core';
import { FormEditorLogger } from './form-editor-logger';

export const formEditorLoggerTypeFactory: (logger: FormEditorLogger) => DynamicFormLoggerType = (logger) => {
  return {
    type: 'dynamic-form-editor-logger',
    libraryName: dynamicFormLibrary.name,
    enabled: true,
    log: (log: DynamicFormLog) => logger.log(log),
  };
};

@NgModule({
  providers: [
    FormEditorLogger,
    {
      provide: DYNAMIC_FORM_LOGGER_TYPE_CONFIG,
      useFactory: formEditorLoggerTypeFactory,
      deps: [ FormEditorLogger ],
      multi: true,
    },
  ],
})
export class FormEditorLoggerModule {}
