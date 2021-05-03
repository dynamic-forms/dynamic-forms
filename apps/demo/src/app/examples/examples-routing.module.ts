import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const examplesRoutes: Routes = [
  {
    path: 'bootstrap',
    loadChildren: () => import('./bootstrap/bootstrap-examples.module').then(m => m.BootstrapExamplesModule)
  },
  {
    path: 'material',
    loadChildren: () => import('./material/material-examples.module').then(m => m.MaterialExamplesModule)
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
export class ExamplesRoutingModule {}
