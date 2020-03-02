import { ModuleWithProviders, NgModule } from '@angular/core';
import { dynamicFormValidationConfig, DynamicFormValidationConfig,
  DYNAMIC_FORM_VALIDATION_CONFIGS } from './dynamic-form-validation-config';
import { DynamicFormValidationBuilder } from './dynamic-form-validation.builder';
import { DynamicFormValidationService } from './dynamic-form-validation.service';

@NgModule({
  providers: [
    DynamicFormValidationBuilder,
    DynamicFormValidationService
  ]
})
export class DynamicFormValidationModule {
  static withValidation(validationConfig?: DynamicFormValidationConfig): ModuleWithProviders<DynamicFormValidationModule> {
    return {
      ngModule: DynamicFormValidationModule,
      providers: [
        {
          provide: DYNAMIC_FORM_VALIDATION_CONFIGS,
          useValue: validationConfig || dynamicFormValidationConfig,
          multi: true
        }
      ]
    };
  }
}
