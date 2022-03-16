import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialFormModule } from '../../form/material/material-form.module';
import { FormExampleModule } from '../form-example.module';
import { MaterialExamplesRoutingModule } from './material-examples-routing.module';
import { MaterialExamplesComponent } from './material-examples.component';

@NgModule({
  imports: [
    CommonModule,
    FormExampleModule,
    MaterialFormModule,
    MaterialExamplesRoutingModule
  ],
  declarations: [
    MaterialExamplesComponent
  ]
})
export class MaterialExamplesModule {}
