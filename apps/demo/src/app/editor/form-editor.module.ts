import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { dynamicFormLibrary, DynamicFormLoggerType, DynamicFormLogLevel, DYNAMIC_FORM_LOGGER_TYPE_CONFIG } from '@dynamic-forms/core';
import { FormDefinitionLoader } from '../examples/form-definition.loader';
import { FormExampleDefinitionResolver } from '../examples/form-example-definition.resolver';
import { FormExampleResolver } from '../examples/form-example.resolver';
import { MonacoEditorModule } from '../monaco/monaco-editor.module';
import { FormEditorLogger } from './form-editor-logger';
import { FormEditorComponent } from './form-editor.component';
import { FormEditorDefinitionResolver } from './form-editor-definition.resolver';

export const formEditorLoggerTypeFactory: (logger: FormEditorLogger) => DynamicFormLoggerType = (logger) => {
  return {
    type: 'dynamic-form-editor-logger',
    libraryName: dynamicFormLibrary.name,
    enabled: true,
    log: (logLevel: DynamicFormLogLevel, message?: any, ...data: any[]) => logger.log(logLevel, message, ...data),
  };
};

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatTabsModule,
    MatButtonModule,
    MonacoEditorModule,
  ],
  declarations: [
    FormEditorComponent,
  ],
  exports: [
    CommonModule,
    MatDialogModule,
    MatTabsModule,
    MatButtonModule,
    FormEditorComponent,
  ],
  providers: [
    FormDefinitionLoader,
    FormExampleResolver,
    FormExampleDefinitionResolver,
    FormEditorDefinitionResolver,
    FormEditorLogger,
    {
      provide: DYNAMIC_FORM_LOGGER_TYPE_CONFIG,
      useFactory: formEditorLoggerTypeFactory,
      deps: [ FormEditorLogger ],
      multi: true,
    },
  ],
})
export class FormEditorModule {}
