import { Type } from '@angular/core';
import { Routes } from '@angular/router';
import { FormDefinitionResolver } from './form-definition.resolver';
import { FormExampleBase } from './form-example-base';
import { FormExampleResolver } from './form-example.resolver';
import { FormModelResolver } from './form-model.resolver';

export const getFormExampleRoutes = <TExampleComponent extends FormExampleBase>(
  exampleComponent: Type<TExampleComponent>
): Routes => [
  {
    path: ':definitionId',
    resolve: {
      example: FormExampleResolver
    },
    children: [
      {
        path: '',
        component: exampleComponent,
        resolve: {
          definition: FormDefinitionResolver
        }
      },
      {
        path: 'models/:modelId',
        component: exampleComponent,
        resolve: {
          definition: FormDefinitionResolver,
          model: FormModelResolver
        }
      }
    ]
  }
];
