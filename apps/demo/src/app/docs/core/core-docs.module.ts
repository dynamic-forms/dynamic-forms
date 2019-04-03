import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreDocsComponent } from './core-docs.component';
import { CoreCoverageComponent } from './coverage/core-coverage.component';

const routes: Routes = [
  {
    path: 'docs/core',
    component: CoreDocsComponent
  },
  {
    path: 'docs/core/coverage',
    component: CoreCoverageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CoreDocsComponent,
    CoreCoverageComponent
  ],
  exports: [
    RouterModule
  ]
})
export class CoreDocsModule {}
