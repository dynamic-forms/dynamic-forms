import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialDynamicFormsModule } from '@dynamic-forms/material';
import { ExampleResolver } from '../example.resolver';
import { MaterialExamplesComponent } from './material-examples.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'examples/material/:templateId',
        component: MaterialExamplesComponent,
        resolve: {
          template: ExampleResolver
        }
      }
    ]),
    MaterialDynamicFormsModule.forRoot()
  ],
  declarations: [
    MaterialExamplesComponent
  ]
})
export class MaterialExamplesModule {}
