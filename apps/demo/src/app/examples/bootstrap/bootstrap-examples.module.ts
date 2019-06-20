import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BsDynamicFormsModule } from '@dynamic-forms/bootstrap';
import { DynamicFormExampleModule } from '../dynamic-form-example.module';
import { DynamicFormExampleResolver } from '../dynamic-form-example.resolver';
import { BootstrapExamplesComponent } from './bootstrap-examples.component';

@NgModule({
  imports: [
    DynamicFormExampleModule,
    BsDynamicFormsModule.forRoot(),
    RouterModule.forChild([
      {
        path: ':exampleId',
        component: BootstrapExamplesComponent,
        resolve: {
          definition: DynamicFormExampleResolver
        }
      }
    ])
  ],
  declarations: [
    BootstrapExamplesComponent
  ],
  exports: [
    RouterModule
  ]
})
export class BootstrapExamplesModule {}
