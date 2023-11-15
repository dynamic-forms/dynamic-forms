import { Type, inject } from '@angular/core';
import { ResolveFn, Routes } from '@angular/router';
import { DynamicFormDefinition } from '@dynamic-forms/core';
import { resolveFormExample, resolveFormExampleDefinition, resolveFormExampleModel } from '../examples/form-example-routes';
import { FormExampleLoader } from '../examples/form-example.loader';
import { FormEditorBase } from './form-editor-base';

export const resolveFormEditorDefinitionDefault: ResolveFn<DynamicFormDefinition> = () =>
  inject(FormExampleLoader).loadDefinition(`./assets/editor/default.json`);

export const getFormEditorRoutes = <TEditorComponent extends FormEditorBase>(editorComponent: Type<TEditorComponent>): Routes => [
  {
    path: '',
    component: editorComponent,
    resolve: {
      definition: resolveFormEditorDefinitionDefault,
    },
  },
  {
    path: ':definitionId',
    resolve: {
      example: resolveFormExample,
    },
    children: [
      {
        path: '',
        component: editorComponent,
        resolve: {
          definition: resolveFormExampleDefinition,
        },
      },
      {
        path: 'models/:modelId',
        component: editorComponent,
        resolve: {
          definition: resolveFormExampleDefinition,
          model: resolveFormExampleModel,
        },
      },
    ],
  },
];
