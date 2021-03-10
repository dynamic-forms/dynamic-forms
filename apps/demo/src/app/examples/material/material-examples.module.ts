import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DynamicFormIconModule } from '@dynamic-forms/core';
import { MatDynamicFormsModule } from '@dynamic-forms/material';
import { v4 } from 'uuid';
import { MarkdownModule } from '../../markdown/markdown.module';
import { DynamicFormDefinitionResolver } from '../dynamic-form-definition.resolver';
import { DynamicFormExampleModule } from '../dynamic-form-example.module';
import { DynamicFormExampleResolver } from '../dynamic-form-example.resolver';
import { DynamicFormModelResolver } from '../dynamic-form-model.resolver';
import { MaterialExamplesComponent } from './material-examples.component';

export function dynamicFormIdBuilder(): string {
  return v4();
}

@NgModule({
  imports: [
    MarkdownModule,
    DynamicFormExampleModule,
    DynamicFormIconModule.withIcons({
      icons: {
        submit: 'send',
        validate: 'error',
        reset: 'delete',
        resetDefault: 'restore_page',
        push: 'add',
        pop: 'remove',
        remove: 'clear',
        clear: 'clear',
        moveDown: 'arrow_downward',
        moveUp: 'arrow_upward',
        register: 'add',
        maximizeModal: 'fullscreen',
        minimizeModal: 'fullscreen_exit'
      },
      libraryName: 'material'
    }),
    MatDynamicFormsModule.forRoot({
      theme: 'material',
      idBuilder: dynamicFormIdBuilder
    }),
    RouterModule.forChild([
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
