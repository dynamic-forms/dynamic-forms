import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsModule, DynamicFormArrayModule, DynamicFormContainerModule, DynamicFormContentModule,
  DynamicFormControlModule, DynamicFormGroupModule, DynamicFormValidationModule,
  DYNAMIC_FORM_LIBRARY } from '@dynamic-forms/core';
import { BsDynamicFormActionModule } from './dynamic-form-action/dynamic-form-action.module';
import { bsDynamicFormLibrary } from './dynamic-form-config/dynamic-form-library';
import { BsDynamicFormFieldWrapperModule } from './dynamic-form-field/dynamic-form-field-wrapper.module';
import { BsDynamicFormInputModule } from './dynamic-form-input/dynamic-form-input.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormsModule,
    DynamicFormArrayModule,
    DynamicFormContainerModule,
    DynamicFormContentModule,
    DynamicFormControlModule,
    DynamicFormGroupModule,
    DynamicFormValidationModule.withValidation(),
    BsDynamicFormActionModule,
    BsDynamicFormInputModule,
    BsDynamicFormFieldWrapperModule
  ],
  exports: [
    DynamicFormsModule
  ]
})
export class BsDynamicFormsModule {
  static forRoot(): ModuleWithProviders<BsDynamicFormsModule> {
    return {
      ngModule: BsDynamicFormsModule,
      providers: [
        {
          provide: DYNAMIC_FORM_LIBRARY,
          useValue: bsDynamicFormLibrary
        }
      ]
    };
  }
}
