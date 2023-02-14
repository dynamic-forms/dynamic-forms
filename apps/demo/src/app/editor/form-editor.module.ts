import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { dynamicFormLibrary, DynamicFormLoggerType, DynamicFormLog, DYNAMIC_FORM_LOGGER_TYPE_CONFIG } from '@dynamic-forms/core';
import { FormDefinitionLoader } from '../examples/form-definition.loader';
import { FormExampleDefinitionResolver } from '../examples/form-example-definition.resolver';
import { FormExampleResolver } from '../examples/form-example.resolver';
import { MonacoEditorModule } from '../monaco/monaco-editor.module';
import { FormEditorLogger } from './form-editor-logger';
import { FormEditorComponent } from './form-editor.component';
import { FormEditorDefinitionResolver } from './form-editor-definition.resolver';
import { FormEditorLogsComponent } from './form-editor-logs.component';
import { FormEditorLogLevelPipe } from './form-editor-log-level.pipe';
import { FormEditorLogDataPipe } from './form-editor-log-data.pipe';

export const formEditorLoggerTypeFactory: (logger: FormEditorLogger) => DynamicFormLoggerType = (logger) => {
  return {
    type: 'dynamic-form-editor-logger',
    libraryName: dynamicFormLibrary.name,
    enabled: true,
    log: (log: DynamicFormLog) => logger.log(log),
  };
};

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MonacoEditorModule,
  ],
  declarations: [
    FormEditorLogLevelPipe,
    FormEditorLogDataPipe,
    FormEditorComponent,
    FormEditorLogsComponent,
  ],
  exports: [
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
