import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormValidationBootstrapComponent } from './dynamic-form-validation.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DynamicFormValidationBootstrapComponent
  ],
  exports: [
    DynamicFormValidationBootstrapComponent
  ]
})
export class DynamicFormValidationBootstrapModule {}
