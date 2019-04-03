import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BootstrapDocsComponent } from './bootstrap-docs.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'docs/bootstrap',
        component: BootstrapDocsComponent
      }
    ])
  ],
  declarations: [
    BootstrapDocsComponent
  ],
  exports: [
    RouterModule
  ]
})
export class BootstrapDocsModule {}
