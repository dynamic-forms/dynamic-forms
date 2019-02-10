import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DynamicFormsCoreModule } from '@dynamic-forms/core';
import { CoreExamplesComponent } from './core-examples.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'examples/core',
        component: CoreExamplesComponent
      }
    ]),
    DynamicFormsCoreModule.forRoot()
  ],
  declarations: [
    CoreExamplesComponent
  ],
  exports: [
    RouterModule
  ]
})
export class CoreExamplesModule {}
