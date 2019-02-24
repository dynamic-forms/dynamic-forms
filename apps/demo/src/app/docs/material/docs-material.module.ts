import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocsMaterialComponent } from './docs-material.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'docs/material',
        component: DocsMaterialComponent
      }
    ])
  ],
  declarations: [
    DocsMaterialComponent
  ],
  exports: [
    RouterModule
  ]
})
export class DocsMaterialModule {}
