import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MonacoEditorComponent } from './monaco-editor.component';
import { MonacoEditorService } from './monaco-editor.service';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule
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
