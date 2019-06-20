import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDynamicFormsModule } from '@dynamic-forms/material';
import { DynamicFormExampleModule } from '../dynamic-form-example.module';
import { DynamicFormExampleResolver } from '../dynamic-form-example.resolver';
import { MaterialExamplesComponent } from './material-examples.component';

@NgModule({
  imports: [
    DynamicFormExampleModule,
    MatDynamicFormsModule.forRoot(),
    RouterModule.forChild([
      {
        path: ':exampleId',
        component: MaterialExamplesComponent,
        resolve: {
          definition: DynamicFormExampleResolver
        }
      }
    ])
  ],
  declarations: [
    MaterialExamplesComponent
  ],
  exports: [
    RouterModule
  ]
})
export class MaterialExamplesModule {}
