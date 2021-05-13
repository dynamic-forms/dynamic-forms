import { Type } from '@angular/core';
import { Routes } from '@angular/router';
import { DynamicFormDefinitionResolver } from './dynamic-form-definition.resolver';
import { DynamicFormExampleBase } from './dynamic-form-example-base';
import { DynamicFormExampleResolver } from './dynamic-form-example.resolver';
import { DynamicFormModelResolver } from './dynamic-form-model.resolver';

export function getDynamicFormExampleRoutes<
  TExampleComponent extends DynamicFormExampleBase
>(exampleComponent: Type<TExampleComponent>): Routes {
  return [
    {
      path: ':definitionId',
      resolve: {
        example: DynamicFormExampleResolver
      },
      children: [
        {
          path: '',
          component: exampleComponent,
          resolve: {
            definition: DynamicFormDefinitionResolver
          }
        },
        {
          path: 'models/:modelId',
          component: exampleComponent,
          resolve: {
            definition: DynamicFormDefinitionResolver,
            model: DynamicFormModelResolver
          }
        }
      ]
    }
  ];
}
