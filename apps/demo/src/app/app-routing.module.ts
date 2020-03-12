import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'examples/bootstrap',
    loadChildren: () => import('./examples/bootstrap/bootstrap-examples.module').then(m => m.BootstrapExamplesModule)
  },
  {
    path: 'examples/material',
    loadChildren: () => import('./examples/material/material-examples.module').then(m => m.MaterialExamplesModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
