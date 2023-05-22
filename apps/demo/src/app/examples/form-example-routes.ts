import { Type, inject } from '@angular/core';
import { Routes, ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { DynamicFormDefinition } from '@dynamic-forms/core';
import { Store } from '@ngxs/store';
import { of, take } from 'rxjs';
import { Example, ExampleMenu } from '../state/examples/examples.model';
import { ExamplesState } from '../state/examples/examples.state';
import { FormExampleBase } from './form-example-base';
import { FormExampleLoader } from './form-example.loader';

export const resolveFormExample: ResolveFn<ExampleMenu> = (route: ActivatedRouteSnapshot) => {
  const definitionId = route.params.definitionId;
  return definitionId !== 'errors'
    ? inject(Store).select(ExamplesState.example(definitionId)).pipe(take(1))
    : of({ id: 'errors', path: 'errors', label: 'Errors' });
}

export const resolveFormExampleDefinition: ResolveFn<DynamicFormDefinition> = (route: ActivatedRouteSnapshot) => {
  const example = route.parent.data.example as Example;
  return inject(FormExampleLoader).loadDefinitionForExample(example);
}

export const resolveFormExampleModel: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
  const modelId = route.params.modelId;
  const example = route.parent.data.example as Example;
  return inject(FormExampleLoader).loadModelForExample(example, modelId);
}

export const getFormExampleRoutes = <TExampleComponent extends FormExampleBase>(
  exampleComponent: Type<TExampleComponent>,
): Routes => [
  {
    path: ':definitionId',
    resolve: {
      example: resolveFormExample,
    },
    children: [
      {
        path: '',
        component: exampleComponent,
        resolve: {
          definition: resolveFormExampleDefinition,
        },
      },
      {
        path: 'models/:modelId',
        component: exampleComponent,
        resolve: {
          definition: resolveFormExampleDefinition,
          model: resolveFormExampleModel,
        },
      },
    ],
  },
];
