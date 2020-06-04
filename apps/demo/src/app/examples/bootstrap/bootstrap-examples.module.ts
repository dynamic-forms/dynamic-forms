import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BsDynamicFormsModule } from '@dynamic-forms/bootstrap';
import { DynamicFormIconModule } from '@dynamic-forms/core';
import { v4 as dynamicFormIdBuilder } from 'uuid';
import { DynamicFormDefinitionResolver } from '../dynamic-form-definition.resolver';
import { DynamicFormExampleModule } from '../dynamic-form-example.module';
import { DynamicFormModelResolver } from '../dynamic-form-model.resolver';
import { BootstrapExamplesComponent } from './bootstrap-examples.component';

@NgModule({
  imports: [
    DynamicFormExampleModule,
    DynamicFormIconModule.withIcons({
      icons: {
        submit: 'send',
        validate: 'error',
        reset: 'delete',
        resetDefault: 'restore_page',
        remove: 'clear'
      },
      libraryName: 'bootstrap'
    }),
    BsDynamicFormsModule.forRoot(dynamicFormIdBuilder),
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
