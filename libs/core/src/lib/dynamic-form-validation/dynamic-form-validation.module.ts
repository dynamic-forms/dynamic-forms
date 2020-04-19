import { ModuleWithProviders, NgModule } from '@angular/core';
import { DynamicFormArrayValidatorType } from '../dynamic-form-array/dynamic-form-array-validator-type';
import { DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-array/dynamic-form-array-validator-type-config';
import { DynamicFormControlValidatorType } from '../dynamic-form-control/dynamic-form-control-validator-type';
import { DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-control/dynamic-form-control-validator-type-config';
import { DynamicFormGroupValidatorType } from '../dynamic-form-group/dynamic-form-group-validator-type';
import { DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-group/dynamic-form-group-validator-type-config';
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
          provide: DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG,
          useValue: controlValidatorType,
          multi: true
        }
      ]
    };
  }

  static withControlValidators(controlValidatorTypes: DynamicFormControlValidatorType[]): ModuleWithProviders<DynamicFormValidationModule> {
    return {
      ngModule: DynamicFormValidationModule,
      providers: [
        {
          provide: DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG,
          useValue: controlValidatorTypes,
          multi: true
        }
      ]
    };
  }

  static withArrayValidator(arrayValidatorType: DynamicFormArrayValidatorType): ModuleWithProviders<DynamicFormValidationModule> {
    return {
      ngModule: DynamicFormValidationModule,
      providers: [
        {
          provide: DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG,
          useValue: arrayValidatorType,
          multi: true
        }
      ]
    };
  }

  static withArrayValidators(arrayValidatorTypes: DynamicFormArrayValidatorType[]): ModuleWithProviders<DynamicFormValidationModule> {
    return {
      ngModule: DynamicFormValidationModule,
      providers: [
        {
          provide: DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG,
          useValue: arrayValidatorTypes,
          multi: true
        }
      ]
    };
  }

  static withGroupValidator(groupValidatorType: DynamicFormGroupValidatorType): ModuleWithProviders<DynamicFormValidationModule> {
    return {
      ngModule: DynamicFormValidationModule,
      providers: [
        {
          provide: DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG,
          useValue: groupValidatorType,
          multi: true
        }
      ]
    };
  }

  static withGroupValidators(groupValidatorTypes: DynamicFormGroupValidatorType[]): ModuleWithProviders<DynamicFormValidationModule> {
    return {
      ngModule: DynamicFormValidationModule,
      providers: [
        {
          provide: DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG,
          useValue: groupValidatorTypes,
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
