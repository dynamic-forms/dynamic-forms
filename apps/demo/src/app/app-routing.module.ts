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
    loadChildren: './examples/bootstrap/bootstrap-examples.module#BootstrapExamplesModule'
  },
  {
    path: 'examples/material',
    loadChildren: './examples/material/material-examples.module#MaterialExamplesModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      useHash: true
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
