import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BootstrapFormModule } from '../../form/bootstrap/bootstrap-form.module';
import { FormExampleModule } from '../form-example.module';
import { BootstrapExamplesRoutingModule } from './bootstrap-examples-routing.module';
import { BootstrapExamplesComponent } from './bootstrap-examples.component';

@NgModule({
  imports: [
    CommonModule,
    FormExampleModule,
    BootstrapFormModule,
    BootstrapExamplesRoutingModule
  ],
  declarations: [
    BootstrapExamplesComponent
  ]
})
export class BootstrapExamplesModule {}
