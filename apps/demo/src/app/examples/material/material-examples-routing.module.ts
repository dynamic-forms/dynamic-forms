import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { getFormExampleRoutes } from '../form-example-routes';
import { MaterialExamplesComponent } from './material-examples.component';

const materialExamplesRoutes: Routes = getFormExampleRoutes(MaterialExamplesComponent);

@NgModule({
  imports: [
    RouterModule.forChild(materialExamplesRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class MaterialExamplesRoutingModule {}
