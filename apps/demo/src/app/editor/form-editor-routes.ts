import { Type } from '@angular/core';
import { Routes } from '@angular/router';
import { FormExampleDefinitionResolver } from '../examples/form-example-definition.resolver';
import { FormExampleResolver } from '../examples/form-example.resolver';
import { FormEditorBase } from './form-editor-base';
import { FormEditorDefinitionResolver } from './form-editor-definition.resolver';

export const getFormEditorRoutes = <TEditorComponent extends FormEditorBase>(
  editorComponent: Type<TEditorComponent>,
): Routes => [
  {
    path: '',
    component: editorComponent,
    resolve: {
      definition: FormEditorDefinitionResolver,
    },
  },
  {
    path: ':definitionId',
    resolve: {
      example: FormExampleResolver,
    },
    children: [
      {
        path: '',
        component: editorComponent,
        resolve: {
          definition: FormExampleDefinitionResolver,
        },
      },
    ],
  },
];
