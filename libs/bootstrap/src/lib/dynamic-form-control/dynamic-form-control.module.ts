import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormValidationBootstrapModule } from '../dynamic-form-validation/dynamic-form-validation.module';
import { DynamicFormControlBootstrapComponent } from './dynamic-form-control.component';

@NgModule({
  imports: [
    CommonModule,
    DynamicFormValidationBootstrapModule
  ],
  declarations: [
    DynamicFormControlBootstrapComponent
  ],
  entryComponents: [
    DynamicFormControlBootstrapComponent
  ]
})
export class DynamicFormControlBootstrapModule {}
