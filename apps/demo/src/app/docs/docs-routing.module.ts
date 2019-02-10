import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocsComponent } from './docs.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'docs',
        component: DocsComponent
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class DocsRoutingModule {}
