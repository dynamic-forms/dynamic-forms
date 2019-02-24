import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIG } from '@dynamic-forms/core';
import { DynamicFormConfigService } from '@dynamic-forms/core';
import { DynamicFormsCoreModule } from '@dynamic-forms/core';
import { dynamicFormsCoreServices } from '@dynamic-forms/core';
import { MatDynamicFormControlModule } from './dynamic-form-control/dynamic-form-control.module';
import { MatDynamicFormInputModule } from './dynamic-form-input/dynamic-form-input.module';
import { MatDynamicFormValidationModule } from './dynamic-form-validation/dynamic-form-validation.module';
import { dynamicFormsMaterialConfig, dynamicFormsMaterialConfigService } from './dynamic-forms-material.config';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormsCoreModule,
    MatDynamicFormControlModule,
    MatDynamicFormInputModule,
    MatDynamicFormValidationModule
  ],
  exports: [
    DynamicFormsCoreModule
  ]
})
export class DynamicFormsMaterialModule {
  static forRoot(config: DynamicFormConfig = dynamicFormsMaterialConfig): ModuleWithProviders {
    return {
      ngModule: DynamicFormsMaterialModule,
      providers: [
        {
          provide: DYNAMIC_FORM_CONFIG,
          useValue: config,
          multi: true
        },
        {
          provide: DynamicFormConfigService,
          useFactory: dynamicFormsMaterialConfigService,
          deps: [ DYNAMIC_FORM_CONFIG ]
        },
        ...dynamicFormsCoreServices
      ]
    };
  }
}
