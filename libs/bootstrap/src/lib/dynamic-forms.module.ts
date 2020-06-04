import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsModule, DynamicFormArrayModule, DynamicFormContainerModule, DynamicFormContentModule,
  DynamicFormControlModule, DynamicFormGroupModule, DynamicFormIdBuilder, DynamicFormValidationModule,
  DYNAMIC_FORM_ID_BUILDER, DYNAMIC_FORM_LIBRARY } from '@dynamic-forms/core';
import { BsDynamicFormActionModule } from './dynamic-form-action/dynamic-form-action.module';
import { BsDynamicFormElementModule } from './dynamic-form-element/dynamic-form-element.module';
import { BsDynamicFormFieldWrapperModule } from './dynamic-form-field/dynamic-form-field-wrapper.module';
import { BsDynamicFormInputModule } from './dynamic-form-input/dynamic-form-input.module';
import { bsDynamicFormLibrary } from './dynamic-form-library/dynamic-form-library';

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
    BsDynamicFormElementModule,
    BsDynamicFormActionModule,
    BsDynamicFormInputModule,
    BsDynamicFormFieldWrapperModule
  ],
  exports: [
    DynamicFormsModule
  ]
})
export class BsDynamicFormsModule {
  static forRoot(idBuilder?: DynamicFormIdBuilder): ModuleWithProviders<BsDynamicFormsModule> {
    return {
      ngModule: BsDynamicFormsModule,
      providers: [
        {
          provide: DYNAMIC_FORM_LIBRARY,
          useValue: bsDynamicFormLibrary
        },
        {
          provide: DYNAMIC_FORM_ID_BUILDER,
          useValue: idBuilder
        }
      ]
    };
  }
}
