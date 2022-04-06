import { NgModule } from '@angular/core';
import { MonacoEditorModule } from '../monaco/monaco-editor.module';
import { EditorRoutingModule } from './editor-routing.module';

@NgModule({
  imports: [
    MonacoEditorModule,
    EditorRoutingModule
  ]
})
export class EditorModule {}
