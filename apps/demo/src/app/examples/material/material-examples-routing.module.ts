import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { getDynamicFormExampleRoutes } from '../dynamic-form-example-routes';
import { MaterialExamplesComponent } from './material-examples.component';

const materialExamplesRoutes: Routes = getDynamicFormExampleRoutes(MaterialExamplesComponent);

@NgModule({
  imports: [
    RouterModule.forChild(materialExamplesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MaterialExamplesRoutingModule {}
