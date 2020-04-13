import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreCoverageComponent } from './coverage/core-coverage.component';
import { CoreDocComponent } from './doc/core-doc.component';

const routes: Routes = [
  {
    path: 'docs/core',
    redirectTo: 'docs/core/doc',
    pathMatch: 'full'
  },
  {
    path: 'docs/core/doc',
    component: CoreDocComponent
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
    CoreCoverageComponent,
    CoreDocComponent
  ],
  exports: [
    RouterModule
  ]
})
export class CoreDocsModule {}
