import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialCoverageComponent } from './coverage/material-coverage.component';
import { MaterialDocsComponent } from './material-docs.component';

const routes: Routes = [
  {
    path: 'docs/material',
    component: MaterialDocsComponent
  },
  {
    path: 'docs/material/coverage',
    component: MaterialCoverageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    MaterialDocsComponent,
    MaterialCoverageComponent
  ],
  exports: [
    RouterModule
  ]
})
export class MaterialDocsModule {}
