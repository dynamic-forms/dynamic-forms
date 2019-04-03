import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialDocsComponent } from './material-docs.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'docs/material',
        component: MaterialDocsComponent
      }
    ])
  ],
  declarations: [
    MaterialDocsComponent
  ],
  exports: [
    RouterModule
  ]
})
export class MaterialDocsModule {}
