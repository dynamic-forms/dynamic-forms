import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocsBootstrapComponent } from './docs-bootstrap.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'docs/bootstrap',
        component: DocsBootstrapComponent
      }
    ])
  ],
  declarations: [
    DocsBootstrapComponent
  ],
  exports: [
    RouterModule
  ]
})
export class DocsBootstrapModule {}
