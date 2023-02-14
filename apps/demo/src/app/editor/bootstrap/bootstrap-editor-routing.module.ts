import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { getFormEditorRoutes } from '../form-editor-routes';
import { BootstrapEditorComponent } from './bootstrap-editor.component';

const bootstrapEditorRoutes: Routes = getFormEditorRoutes(BootstrapEditorComponent);

@NgModule({
  imports: [
    RouterModule.forChild(bootstrapEditorRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class BootstrapEditorRoutingModule {}
