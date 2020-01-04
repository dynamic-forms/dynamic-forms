import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { dynamicFormProviders, DynamicFormsModule, DynamicFormArrayModule, DynamicFormConfig,
  DynamicFormContainerModule, DynamicFormContentModule, DynamicFormControlModule, DynamicFormGroupModule,
  DYNAMIC_FORM_CONFIG, DYNAMIC_FORM_LIBRARY } from '@dynamic-forms/core';
import { BsDynamicFormFieldWrapperModule } from './dynamic-form-field-wrapper/dynamic-form-field-wrapper.module';
import { BsDynamicFormInputModule } from './dynamic-form-input/dynamic-form-input.module';
import { bsDynamicFormConfig } from './dynamic-forms.config';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormsModule.forRoot(),
    DynamicFormArrayModule,
    DynamicFormContainerModule,
    DynamicFormContentModule,
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
      providers: [
        {
          provide: DYNAMIC_FORM_LIBRARY,
          useValue: config ? config.library : bsDynamicFormConfig.library
        },
        {
          provide: DYNAMIC_FORM_CONFIG,
          useValue: config || bsDynamicFormConfig,
          multi: true
        },
        ...dynamicFormProviders
      ]
    };
  }

  static forChild(config: DynamicFormConfig): ModuleWithProviders {
    return {
      ngModule: BsDynamicFormsModule,
      providers: [
        {
          provide: DYNAMIC_FORM_CONFIG,
          useValue: config,
          multi: true
        }
      ]
    };
  }
}
