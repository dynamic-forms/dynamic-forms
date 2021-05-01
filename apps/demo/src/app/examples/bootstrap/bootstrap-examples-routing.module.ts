import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicFormDefinitionResolver } from '../dynamic-form-definition.resolver';
import { DynamicFormExampleResolver } from '../dynamic-form-example.resolver';
import { DynamicFormModelResolver } from '../dynamic-form-model.resolver';
import { BootstrapExamplesComponent } from './bootstrap-examples.component';

const bootstrapExamplesRoutes: Routes = [
  {
    path: ':definitionId',
    resolve: {
      example: DynamicFormExampleResolver
    },
    children: [
      {
        path: '',
        component: BootstrapExamplesComponent,
        resolve: {
          definition: DynamicFormDefinitionResolver
        }
      },
      {
        path: 'models/:modelId',
        component: BootstrapExamplesComponent,
        resolve: {
          definition: DynamicFormDefinitionResolver,
          model: DynamicFormModelResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(bootstrapExamplesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BootstrapExamplesRoutingModule {}
