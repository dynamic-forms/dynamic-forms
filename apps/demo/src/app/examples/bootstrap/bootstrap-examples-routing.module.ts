import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { getFormExampleRoutes } from '../form-example-routes';
import { BootstrapExamplesComponent } from './bootstrap-examples.component';

const bootstrapExamplesRoutes: Routes = getFormExampleRoutes(BootstrapExamplesComponent);

@NgModule({
  imports: [
    RouterModule.forChild(bootstrapExamplesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BootstrapExamplesRoutingModule {}
