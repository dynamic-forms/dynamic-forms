import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsModule, DynamicFormArrayModule, DynamicFormContainerModule, DynamicFormContentModule,
  DynamicFormControlModule, DynamicFormDictionaryModule, DynamicFormGroupModule, DynamicFormIdBuilder,
  DynamicFormMarkdownModule, DynamicFormValidationModule, DYNAMIC_FORM_ID_BUILDER,
  DYNAMIC_FORM_LIBRARY, DYNAMIC_FORM_THEME } from '@dynamic-forms/core';
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
    DynamicFormControlModule,
    DynamicFormGroupModule,
    DynamicFormArrayModule,
    DynamicFormDictionaryModule,
    DynamicFormValidationModule.withValidation(),
    DynamicFormContainerModule,
    DynamicFormContentModule,
    DynamicFormMarkdownModule,
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
  static forRoot(config?: { theme?: string, idBuilder?: DynamicFormIdBuilder }): ModuleWithProviders<BsDynamicFormsModule> {
    return {
      ngModule: BsDynamicFormsModule,
      providers: [
        {
          provide: DYNAMIC_FORM_LIBRARY,
          useValue: bsDynamicFormLibrary
        },
        {
          provide: DYNAMIC_FORM_THEME,
          useValue: config && config.theme
        },
        {
          provide: DYNAMIC_FORM_ID_BUILDER,
          useValue: config && config.idBuilder
        }
      ]
    };
  }
}
