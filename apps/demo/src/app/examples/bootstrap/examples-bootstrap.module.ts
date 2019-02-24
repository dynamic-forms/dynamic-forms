import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { DynamicFormsBootstrapModule } from '@dynamic-forms/bootstrap';
import { ExamplesResolver } from './../examples.resolver';
import { ExamplesBootstrapComponent } from './examples-bootstrap.component';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    RouterModule.forChild([
      {
        path: ':templateId',
        component: ExamplesBootstrapComponent,
        resolve: {
          template: ExamplesResolver
        }
      }
    ]),
    DynamicFormsBootstrapModule.forRoot()
  ],
  declarations: [
    ExamplesBootstrapComponent
  ],
  exports: [
    RouterModule
  ]
})
export class ExamplesBootstrapModule {}
