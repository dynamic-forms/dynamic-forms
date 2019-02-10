import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExamplesComponent } from './examples.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'examples',
        component: ExamplesComponent
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class ExamplesRoutingModule {}
