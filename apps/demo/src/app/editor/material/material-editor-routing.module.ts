import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { getFormEditorRoutes } from '../form-editor-routes';
import { MaterialEditorComponent } from './material-editor.component';

const materialEditorRoutes: Routes = getFormEditorRoutes(MaterialEditorComponent);

@NgModule({
  imports: [
    RouterModule.forChild(materialEditorRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class MaterialEditorRoutingModule {}
