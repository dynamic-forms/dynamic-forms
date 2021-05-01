import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicFormDefinitionResolver } from '../dynamic-form-definition.resolver';
import { DynamicFormExampleResolver } from '../dynamic-form-example.resolver';
import { DynamicFormModelResolver } from '../dynamic-form-model.resolver';
import { MaterialExamplesComponent } from './material-examples.component';

const materialExamplesRoutes: Routes = [
  {
    path: ':definitionId',
    resolve: {
      example: DynamicFormExampleResolver
    },
    children: [
      {
        path: '',
        component: MaterialExamplesComponent,
        resolve: {
          definition: DynamicFormDefinitionResolver
        }
      },
      {
        path: 'models/:modelId',
        component: MaterialExamplesComponent,
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
    RouterModule.forChild(materialExamplesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MaterialExamplesRoutingModule {}