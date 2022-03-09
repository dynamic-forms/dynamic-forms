import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MonacoEditorComponent } from './monaco-editor.component';
import { MonacoEditorService } from './monaco-editor.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MonacoEditorComponent
  ],
  exports: [
    MonacoEditorComponent
  ],
  providers: [
    MonacoEditorService
  ]
})
export class MonacoEditorModule {}
