import { ModuleWithProviders, NgModule } from '@angular/core';
import { DynamicFormControlValidatorType, DynamicFormControlValidatorTypes,
  DYNAMIC_FORM_CONTROL_VALIDATOR_TYPES } from '../dynamic-form-control/dynamic-form-control-validator-type';
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
  static withControlValidator(controlValidatorType: DynamicFormControlValidatorType): ModuleWithProviders<DynamicFormValidationModule> {
    return {
      ngModule: DynamicFormValidationModule,
      providers: [
        {
          provide: DYNAMIC_FORM_CONTROL_VALIDATOR_TYPES,
          useValue: controlValidatorType,
          multi: true
        }
      ]
    };
  }

  static withControlValidators(controlValidatorTypes: DynamicFormControlValidatorTypes): ModuleWithProviders<DynamicFormValidationModule> {
    return {
      ngModule: DynamicFormValidationModule,
      providers: [
        {
          provide: DYNAMIC_FORM_CONTROL_VALIDATOR_TYPES,
          useValue: controlValidatorTypes,
          multi: true
        }
      ]
    };
  }

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
