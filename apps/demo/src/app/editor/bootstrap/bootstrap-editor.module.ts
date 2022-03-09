import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormEditorModule } from '../dynamic-form-editor.module';
import { BootstrapEditorRoutingModule } from './bootstrap-editor-routing.module';
import { BootstrapEditorComponent } from './bootstrap-editor.component';

@NgModule({
  imports: [
    CommonModule,
    DynamicFormEditorModule,
    BootstrapEditorRoutingModule
  ],
  declarations: [
    BootstrapEditorComponent
  ]
})
export class BootstrapEditorModule {}
