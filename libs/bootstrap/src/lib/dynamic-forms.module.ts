import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { getDynamicFormProviders, DynamicFormsModule, DynamicFormConfig } from '@dynamic-forms/core';
import { BsDynamicFormInputModule } from './dynamic-form-input/dynamic-form-input.module';
import { BsDynamicFormFieldWrapperModule } from './dynamic-form-wrapper/dynamic-form-field-wrapper.module';
import { bsDynamicFormConfig } from './dynamic-forms.config';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormsModule,
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
