import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDynamicFormValidationComponent } from './dynamic-form-validation.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BsDynamicFormValidationComponent
  ],
  exports: [
    BsDynamicFormValidationComponent
  ]
})
export class BsDynamicFormValidationModule {}
