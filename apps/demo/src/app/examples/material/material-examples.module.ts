import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DynamicFormIconModule } from '@dynamic-forms/core';
import { MatDynamicFormsModule } from '@dynamic-forms/material';
import { v4 } from 'uuid';
import { DynamicFormDefinitionResolver } from '../dynamic-form-definition.resolver';
import { DynamicFormExampleModule } from '../dynamic-form-example.module';
import { DynamicFormModelResolver } from '../dynamic-form-model.resolver';
import { MaterialExamplesComponent } from './material-examples.component';

export function dynamicFormIdBuilder(): string {
  return v4();
}

@NgModule({
  imports: [
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
        register: 'add'
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
        component: MaterialExamplesComponent,
        resolve: {
          definition: DynamicFormDefinitionResolver
        }
      },
      {
        path: ':definitionId/models/:modelId',
        component: MaterialExamplesComponent,
        resolve: {
          definition: DynamicFormDefinitionResolver,
          model: DynamicFormModelResolver
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
