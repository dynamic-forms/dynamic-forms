import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDynamicFormsModule } from '@dynamic-forms/material';
import { DynamicFormDefinitionResolver } from '../dynamic-form-definition.resolver';
import { DynamicFormExampleModule } from '../dynamic-form-example.module';
import { DynamicFormModelResolver } from '../dynamic-form-model.resolver';
import { MaterialExamplesComponent } from './material-examples.component';

@NgModule({
  imports: [
    DynamicFormExampleModule,
    MatDynamicFormsModule.forRoot(),
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
