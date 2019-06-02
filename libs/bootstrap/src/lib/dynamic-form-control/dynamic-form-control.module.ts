import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDynamicFormValidationModule } from '../dynamic-form-validation/dynamic-form-validation.module';
import { BsDynamicFormControlComponent } from './dynamic-form-control.component';

@NgModule({
  imports: [
    CommonModule,
    BsDynamicFormValidationModule
  ],
  declarations: [
    BsDynamicFormControlComponent
  ],
  entryComponents: [
    BsDynamicFormControlComponent
  ]
})
export class BsDynamicFormControlModule {}
