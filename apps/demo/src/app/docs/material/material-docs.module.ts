import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialCoverageComponent } from './coverage/material-coverage.component';
import { MaterialDocComponent } from './doc/material-doc.component';

const routes: Routes = [
  {
    path: 'docs/material',
    redirectTo: 'docs/material/doc',
    pathMatch: 'full'
  },
  {
    path: 'docs/material/doc',
    component: MaterialDocComponent
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
    MaterialCoverageComponent,
    MaterialDocComponent
  ],
  exports: [
    RouterModule
  ]
})
export class MaterialDocsModule {}
