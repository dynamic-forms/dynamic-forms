import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { DynamicFormsMaterialModule } from '@dynamic-forms/material';
import { ExamplesResolver } from '../examples.resolver';
import { MaterialExamplesComponent } from './material-examples.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatTabsModule,
    DynamicFormsMaterialModule.forRoot(),
    RouterModule.forChild([
      {
        path: ':templateId',
        component: MaterialExamplesComponent,
        resolve: {
          template: ExamplesResolver
        }
      }
    ])
  ],
  declarations: [
    MaterialExamplesComponent
  ],
  providers: [
    ExamplesResolver
  ]
})
export class MaterialExamplesModule {}
