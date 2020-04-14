import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BootstrapCoverageComponent } from './coverage/bootstrap-coverage.component';
import { BootstrapDocComponent } from './doc/bootstrap-doc.component';

const routes: Routes = [
  {
    path: 'docs/bootstrap',
    redirectTo: 'docs/bootstrap/doc',
    pathMatch: 'full'
  },
  {
    path: 'docs/bootstrap/doc',
    component: BootstrapDocComponent
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
    BootstrapCoverageComponent,
    BootstrapDocComponent
  ],
  exports: [
    RouterModule
  ]
})
export class BootstrapDocsModule {}
