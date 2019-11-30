import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDynamicFormControlErrorsModule } from './dynamic-form-control-errors/dynamic-form-control-errors.module';
import { BsDynamicFormControlHintsModule } from './dynamic-form-control-hints/dynamic-form-control-hints.module';
import { BsDynamicFormControlLabelModule } from './dynamic-form-control-label/dynamic-form-control-label.module';

@NgModule({
  imports: [
    CommonModule,
    BsDynamicFormControlErrorsModule,
    BsDynamicFormControlLabelModule,
    BsDynamicFormControlHintsModule
  ]
})
export class BsDynamicFormFieldWrapperModule {}
