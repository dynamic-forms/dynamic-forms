import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsCoreModule } from '@dynamic-forms/core';
import { dynamicFormsCoreServices } from '@dynamic-forms/core';
import { DynamicFormConfigService } from '@dynamic-forms/core';
import { DynamicFormComponent } from '@dynamic-forms/core';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIG } from '@dynamic-forms/core';
import { BsDynamicFormControlModule } from './dynamic-form-control/dynamic-form-control.module';
import { BsDynamicFormInputModule } from './dynamic-form-input/dynamic-form-input.module';
import { BsDynamicFormValidationModule } from './dynamic-form-validation/dynamic-form-validation.module';
import { BsDynamicFormWrapperModule } from './dynamic-form-wrapper/dynamic-form-wrapper.module';
import { bsDynamicFormConfig, bsDynamicFormConfigFactory } from './dynamic-forms-bootstrap.config';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormsCoreModule,
    BsDynamicFormControlModule,
    BsDynamicFormInputModule,
    BsDynamicFormValidationModule,
    BsDynamicFormWrapperModule
  ],
  exports: [
    DynamicFormComponent
  ]
})
export class BsDynamicFormsModule {
  static forRoot(config?: DynamicFormConfig): ModuleWithProviders {
    return {
      ngModule: BsDynamicFormsModule,
      providers: [
        {
          provide: DYNAMIC_FORM_CONFIG,
          useValue: config || bsDynamicFormConfig,
          multi: true
        },
        {
          provide: DynamicFormConfigService,
          useFactory: bsDynamicFormConfigFactory,
          deps: [ DYNAMIC_FORM_CONFIG ]
        },
        ...dynamicFormsCoreServices
      ]
    };
  }
}
