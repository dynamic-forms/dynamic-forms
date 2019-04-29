import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DynamicFormsMaterialModule } from '@dynamic-forms/material';
import { DynamicFormExampleModule } from '../dynamic-form-example.module';
import { DynamicFormTemplateResolver } from '../dynamic-form-template.resolver';
import { MaterialExamplesComponent } from './material-examples.component';

@NgModule({
  imports: [
    DynamicFormExampleModule,
    DynamicFormsMaterialModule.forRoot(),
    RouterModule.forChild([
      {
        path: ':templateId',
        component: MaterialExamplesComponent,
        resolve: {
          template: DynamicFormTemplateResolver
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
