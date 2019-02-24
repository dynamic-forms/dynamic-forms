import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { DynamicFormsBootstrapModule } from '@dynamic-forms/bootstrap';
import { ExamplesResolver } from './../examples.resolver';
import { ExamplesBootstrapComponent } from './examples-bootstrap.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatTabsModule,
    DynamicFormsBootstrapModule.forRoot(),
    RouterModule.forChild([
      {
        path: ':templateId',
        component: ExamplesBootstrapComponent,
        resolve: {
          template: ExamplesResolver
        }
      }
    ])
  ],
  declarations: [
    ExamplesBootstrapComponent
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ExamplesResolver
  ]
})
export class ExamplesBootstrapModule {}
