import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'docs',
    loadChildren: () => import("./docs/docs.module").then(m => m.DocsModule)
  },
  {
    path: 'examples/bootstrap',
    loadChildren: () => import('./examples/bootstrap/bootstrap-examples.module').then(m => m.BootstrapExamplesModule)
  },
  {
    path: 'examples/material',
    loadChildren: () => import('./examples/material/material-examples.module').then(m => m.MaterialExamplesModule)
  },
  {
    path: 'license',
    loadChildren: () => import("./license/license.module").then(m => m.LicenseModule)
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
