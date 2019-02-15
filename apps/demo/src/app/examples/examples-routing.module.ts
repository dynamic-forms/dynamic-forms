import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExamplesComponent } from './examples.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'examples',
        component: ExamplesComponent,
        /*children: [
          {
            path: 'bootstrap',
            loadChildren: './bootstrap/bootstrap-examples.module#BootstrapExamplesModule'
          },
          {
            path: 'material',
            loadChildren: './material/material-examples.module#MaterialExamplesModule'
          }
        ]*/
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class ExamplesRoutingModule {}
