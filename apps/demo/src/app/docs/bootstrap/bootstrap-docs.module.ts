import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BootstrapDocsComponent } from './bootstrap-docs.component';
import { BootstrapCoverageComponent } from './coverage/bootstrap-coverage.component';

const routes: Routes = [
  {
    path: 'docs/bootstrap',
    component: BootstrapDocsComponent
  },
  {
    path: 'docs/bootstrap/coverage',
    component: BootstrapCoverageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    BootstrapDocsComponent,
    BootstrapCoverageComponent
  ],
  exports: [
    RouterModule
  ]
})
export class BootstrapDocsModule {}
