import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BsDynamicFormsModule } from '@dynamic-forms/bootstrap';
import { DynamicFormIconModule } from '@dynamic-forms/core';
import { v4 } from 'uuid';
import { DynamicFormDefinitionResolver } from '../dynamic-form-definition.resolver';
import { DynamicFormExampleModule } from '../dynamic-form-example.module';
import { DynamicFormModelResolver } from '../dynamic-form-model.resolver';
import { BootstrapExamplesComponent } from './bootstrap-examples.component';

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
      libraryName: 'bootstrap'
    }),
    BsDynamicFormsModule.forRoot({
      theme: 'bootstrap',
      idBuilder: dynamicFormIdBuilder
    }),
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
