import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const editorsRoutes: Routes = [
  {
    path: 'bootstrap',
    loadChildren: () => import('./bootstrap/bootstrap-editor.module').then(m => m.BootstrapEditorModule)
  },
  {
    path: 'material',
    loadChildren: () => import('./material/material-editor.module').then(m => m.MaterialEditorModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(editorsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class EditorRoutingModule {}
