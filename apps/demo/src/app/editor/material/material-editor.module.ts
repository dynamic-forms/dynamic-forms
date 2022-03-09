import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormEditorModule } from '../dynamic-form-editor.module';
import { MaterialEditorRoutingModule } from './material-editor-routing.module';
import { MaterialEditorComponent } from './material-editor.component';

@NgModule({
  imports: [
    CommonModule,
    DynamicFormEditorModule,
    MaterialEditorRoutingModule
  ],
  declarations: [
    MaterialEditorComponent
  ]
})
export class MaterialEditorModule {}
