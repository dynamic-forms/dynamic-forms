import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const examplesRoutes: Routes = [
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
    RouterModule.forChild(examplesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class EditorRoutingModule {}
