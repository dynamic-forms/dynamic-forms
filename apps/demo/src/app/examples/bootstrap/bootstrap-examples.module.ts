import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BootstrapDynamicFormsModule } from '@dynamic-forms/bootstrap';
import { ExampleResolver } from './../example.resolver';
import { BootstrapExamplesComponent } from './bootstrap-examples.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'examples/bootstrap/:templateId',
        component: BootstrapExamplesComponent,
        resolve: {
          template: ExampleResolver
        }
      }
    ]),
    BootstrapDynamicFormsModule.forRoot()
  ],
  declarations: [
    BootstrapExamplesComponent
  ],
  exports: [
    RouterModule
  ]
})
export class BootstrapExamplesModule {}
