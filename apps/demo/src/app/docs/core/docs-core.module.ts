import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocsCoreComponent } from './docs-core.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'docs/core',
        component: DocsCoreComponent
      }
    ])
  ],
  declarations: [
    DocsCoreComponent
  ],
  exports: [
    RouterModule
  ]
})
export class DocsCoreModule {}
