import { ModuleWithProviders, NgModule } from '@angular/core';
import { DynamicFormArrayValidatorType } from '../dynamic-form-array/dynamic-form-array-validator-type';
import { DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-array/dynamic-form-array-validator-type-config';
import { DynamicFormControlValidatorType } from '../dynamic-form-control/dynamic-form-control-validator-type';
import { DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-control/dynamic-form-control-validator-type-config';
import { DynamicFormDictionaryValidatorType } from '../dynamic-form-dictionary/dynamic-form-dictionary-validator-type';
import { DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-dictionary/dynamic-form-dictionary-validator-type-config';
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
  static withControlValidator(type: DynamicFormControlValidatorType): ModuleWithProviders<DynamicFormValidationModule> {
    return {
      ngModule: DynamicFormValidationModule,
      providers: [
        {
          provide: DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG,
          useValue: type,
          multi: true
        }
      ]
    };
  }

  static withControlValidators(types: DynamicFormControlValidatorType[]): ModuleWithProviders<DynamicFormValidationModule> {
    return {
      ngModule: DynamicFormValidationModule,
      providers: [
        {
          provide: DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG,
          useValue: types,
          multi: true
        }
      ]
    };
  }

  static withGroupValidator(type: DynamicFormGroupValidatorType): ModuleWithProviders<DynamicFormValidationModule> {
    return {
      ngModule: DynamicFormValidationModule,
      providers: [
        {
          provide: DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG,
          useValue: type,
          multi: true
        }
      ]
    };
  }

  static withGroupValidators(types: DynamicFormGroupValidatorType[]): ModuleWithProviders<DynamicFormValidationModule> {
    return {
      ngModule: DynamicFormValidationModule,
      providers: [
        {
          provide: DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG,
          useValue: types,
          multi: true
        }
      ]
    };
  }

  static withArrayValidator(type: DynamicFormArrayValidatorType): ModuleWithProviders<DynamicFormValidationModule> {
    return {
      ngModule: DynamicFormValidationModule,
      providers: [
        {
          provide: DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG,
          useValue: type,
          multi: true
        }
      ]
    };
  }

  static withArrayValidators(types: DynamicFormArrayValidatorType[]): ModuleWithProviders<DynamicFormValidationModule> {
    return {
      ngModule: DynamicFormValidationModule,
      providers: [
        {
          provide: DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG,
          useValue: types,
          multi: true
        }
      ]
    };
  }

  static withDictionaryValidator(type: DynamicFormDictionaryValidatorType): ModuleWithProviders<DynamicFormValidationModule> {
    return {
      ngModule: DynamicFormValidationModule,
      providers: [
        {
          provide: DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG,
          useValue: type,
          multi: true
        }
      ]
    };
  }

  static withDictionaryValidators(types: DynamicFormDictionaryValidatorType[]): ModuleWithProviders<DynamicFormValidationModule> {
    return {
      ngModule: DynamicFormValidationModule,
      providers: [
        {
          provide: DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG,
          useValue: types,
          multi: true
        }
      ]
    };
  }

  static withValidation(config?: DynamicFormValidationConfig): ModuleWithProviders<DynamicFormValidationModule> {
    return {
      ngModule: DynamicFormValidationModule,
      providers: [
        {
          provide: DYNAMIC_FORM_VALIDATION_CONFIGS,
          useValue: config || dynamicFormValidationConfig,
          multi: true
        }
      ]
    };
  }
}
