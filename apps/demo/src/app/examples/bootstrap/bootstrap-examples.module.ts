import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { DynamicFormsBootstrapModule } from '@dynamic-forms/bootstrap';
import { ExampleResolver } from './../example.resolver';
import { BootstrapExamplesComponent } from './bootstrap-examples.component';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    RouterModule.forChild([
      {
        path: ':templateId',
        component: BootstrapExamplesComponent,
        resolve: {
          template: ExampleResolver
        }
      }
    ]),
    DynamicFormsBootstrapModule.forRoot()
  ],
  declarations: [
    BootstrapExamplesComponent
  ],
  exports: [
    RouterModule
  ]
})
export class BootstrapExamplesModule {}
