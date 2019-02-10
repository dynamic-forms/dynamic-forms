import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DynamicFormsMaterialModule } from '@dynamic-forms/material';
import { MaterialExamplesComponent } from './material-examples.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'examples/material',
        component: MaterialExamplesComponent
      }
    ]),
    DynamicFormsMaterialModule.forRoot()
  ],
  declarations: [
    MaterialExamplesComponent
  ]
})
export class MaterialExamplesModule {}
