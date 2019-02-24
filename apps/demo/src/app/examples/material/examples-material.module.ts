import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { DynamicFormsMaterialModule } from '@dynamic-forms/material';
import { ExamplesResolver } from '../examples.resolver';
import { ExamplesMaterialComponent } from './examples-material.component';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    RouterModule.forChild([
      {
        path: ':templateId',
        component: ExamplesMaterialComponent,
        resolve: {
          template: ExamplesResolver
        }
      }
    ]),
    DynamicFormsMaterialModule.forRoot()
  ],
  declarations: [
    ExamplesMaterialComponent
  ]
})
export class ExamplesMaterialModule {}
