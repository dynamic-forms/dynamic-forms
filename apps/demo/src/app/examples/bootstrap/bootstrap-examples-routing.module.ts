import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { getDynamicFormExampleRoutes } from '../dynamic-form-example-routes';
import { BootstrapExamplesComponent } from './bootstrap-examples.component';

const bootstrapExamplesRoutes: Routes = getDynamicFormExampleRoutes(BootstrapExamplesComponent);

@NgModule({
  imports: [
    RouterModule.forChild(bootstrapExamplesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BootstrapExamplesRoutingModule {}
