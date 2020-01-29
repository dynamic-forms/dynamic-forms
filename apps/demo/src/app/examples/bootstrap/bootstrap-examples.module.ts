import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BsDynamicFormsModule } from '@dynamic-forms/bootstrap';
import { DynamicFormDefinitionResolver } from '../dynamic-form-definition.resolver';
import { DynamicFormExampleModule } from '../dynamic-form-example.module';
import { DynamicFormModelResolver } from '../dynamic-form-model.resolver';
import { BootstrapExamplesComponent } from './bootstrap-examples.component';

@NgModule({
  imports: [
    DynamicFormExampleModule,
    BsDynamicFormsModule.forRoot(),
    RouterModule.forChild([
      {
        path: ':definitionId',
        component: BootstrapExamplesComponent,
        resolve: {
          definition: DynamicFormDefinitionResolver
        }
      },
      {
        path: ':definitionId/models/:modelId',
        component: BootstrapExamplesComponent,
        resolve: {
          definition: DynamicFormDefinitionResolver,
          model: DynamicFormModelResolver
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
