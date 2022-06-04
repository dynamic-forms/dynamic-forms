import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialFormModule } from '../../form/material/material-form.module';
import { FormEditorModule } from '../form-editor.module';
import { MaterialEditorRoutingModule } from './material-editor-routing.module';
import { MaterialEditorComponent } from './material-editor.component';

@NgModule({
  imports: [
    CommonModule,
    FormEditorModule,
    MaterialFormModule,
    MaterialEditorRoutingModule,
  ],
  declarations: [
    MaterialEditorComponent,
  ],
})
export class MaterialEditorModule {}
