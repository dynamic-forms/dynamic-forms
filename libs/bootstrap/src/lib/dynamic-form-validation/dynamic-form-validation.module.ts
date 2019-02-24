import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BootstrapDynamicFormValidationComponent } from './dynamic-form-validation.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BootstrapDynamicFormValidationComponent
  ],
  exports: [
    BootstrapDynamicFormValidationComponent
  ]
})
export class BootstrapDynamicFormValidationModule {}
