import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { getDynamicFormProviders, DynamicFormsModule, DynamicFormArrayModule,
  DynamicFormConfig, DynamicFormControlModule, DynamicFormGroupModule } from '@dynamic-forms/core';
import { BsDynamicFormFieldWrapperModule } from './dynamic-form-field-wrapper/dynamic-form-field-wrapper.module';
import { BsDynamicFormInputModule } from './dynamic-form-input/dynamic-form-input.module';
import { bsDynamicFormConfig } from './dynamic-forms.config';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormsModule,
    DynamicFormArrayModule,
    DynamicFormControlModule,
    DynamicFormGroupModule,
    BsDynamicFormInputModule,
    BsDynamicFormFieldWrapperModule
  ],
  exports: [
    DynamicFormsModule
  ]
})
export class BsDynamicFormsModule {
  static forRoot(config?: DynamicFormConfig): ModuleWithProviders {
    return {
      ngModule: BsDynamicFormsModule,
      providers: getDynamicFormProviders(bsDynamicFormConfig, config)
    };
  }
}
