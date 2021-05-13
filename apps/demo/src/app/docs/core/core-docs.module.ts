import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreCoverageComponent } from './coverage/core-coverage.component';
import { CoreDocComponent } from './doc/core-doc.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'doc',
    pathMatch: 'full'
  },
  {
    path: 'doc',
    component: CoreDocComponent
  },
  {
    path: 'coverage',
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
