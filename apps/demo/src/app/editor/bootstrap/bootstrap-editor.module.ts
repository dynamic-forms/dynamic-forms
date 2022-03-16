import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BootstrapFormModule } from '../../form/bootstrap/bootstrap-form.module';
import { FormEditorModule } from '../form-editor.module';
import { BootstrapEditorRoutingModule } from './bootstrap-editor-routing.module';
import { BootstrapEditorComponent } from './bootstrap-editor.component';

@NgModule({
  imports: [
    CommonModule,
    FormEditorModule,
    BootstrapFormModule,
    BootstrapEditorRoutingModule
  ],
  declarations: [
    BootstrapEditorComponent
  ]
})
export class BootstrapEditorModule {}
