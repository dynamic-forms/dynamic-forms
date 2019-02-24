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
    loadChildren: './examples/bootstrap/examples-bootstrap.module#ExamplesBootstrapModule'
  },
  {
    path: 'examples/material',
    loadChildren: './examples/material/examples-material.module#ExamplesMaterialModule'
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
