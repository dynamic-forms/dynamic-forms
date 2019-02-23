import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BootstrapDynamicFormValidationModule } from '../dynamic-form-validation/dynamic-form-validation.module';
import { BootstrapDynamicFormControlComponent } from './dynamic-form-control.component';

@NgModule({
  imports: [
    CommonModule,
    BootstrapDynamicFormValidationModule
  ],
  declarations: [
    BootstrapDynamicFormControlComponent
  ],
  entryComponents: [
    BootstrapDynamicFormControlComponent
  ]
})
export class BootstrapDynamicFormControlModule {}
