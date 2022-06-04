import { ModuleWithProviders, NgModule } from '@angular/core';
import { DynamicFormArrayAsyncValidatorType, DynamicFormArrayValidatorType } from '../dynamic-form-array/dynamic-form-array-validator-type';
import { DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-array/dynamic-form-array-validator-type-config';
import {
  DynamicFormControlAsyncValidatorType, DynamicFormControlValidatorType,
} from '../dynamic-form-control/dynamic-form-control-validator-type';
import { DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-control/dynamic-form-control-validator-type-config';
import {
  DynamicFormDictionaryAsyncValidatorType, DynamicFormDictionaryValidatorType,
} from '../dynamic-form-dictionary/dynamic-form-dictionary-validator-type';
import { DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-dictionary/dynamic-form-dictionary-validator-type-config';
import { DynamicFormGroupAsyncValidatorType, DynamicFormGroupValidatorType } from '../dynamic-form-group/dynamic-form-group-validator-type';
import { DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-group/dynamic-form-group-validator-type-config';
import {
  dynamicFormValidationConfig, DynamicFormValidationConfig, DYNAMIC_FORM_VALIDATION_CONFIGS,
} from './dynamic-form-validation-config';
import { DynamicFormValidationBuilder } from './dynamic-form-validation.builder';
import { DynamicFormValidationService } from './dynamic-form-validation.service';

@NgModule({
  providers: [
    DynamicFormValidationBuilder,
    DynamicFormValidationService,
  ],
})
export class DynamicFormValidationModule {
  static withControlValidator(
    type: DynamicFormControlValidatorType | DynamicFormControlAsyncValidatorType,
  ): ModuleWithProviders<DynamicFormValidationModule> {
    return {
      ngModule: DynamicFormValidationModule,
      providers: [
        {
          provide: DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG,
          useValue: type,
          multi: true,
        },
      ],
    };
  }

  static withControlValidators(
    types: (DynamicFormControlValidatorType | DynamicFormControlAsyncValidatorType)[],
  ): ModuleWithProviders<DynamicFormValidationModule> {
    return {
      ngModule: DynamicFormValidationModule,
      providers: [
        {
          provide: DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG,
          useValue: types,
          multi: true,
        },
      ],
    };
  }

  static withControlValidatorFactory(
    typeFactory: (...depTypes: any[]) => DynamicFormControlValidatorType | DynamicFormControlAsyncValidatorType, deps?: any[],
  ): ModuleWithProviders<DynamicFormValidationModule> {
    return {
      ngModule: DynamicFormValidationModule,
      providers: [
        {
          provide: DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG,
          useFactory: typeFactory,
          deps,
          multi: true,
        },
      ],
    };
  }

  static withGroupValidator(
    type: DynamicFormGroupValidatorType | DynamicFormGroupAsyncValidatorType,
  ): ModuleWithProviders<DynamicFormValidationModule> {
    return {
      ngModule: DynamicFormValidationModule,
      providers: [
        {
          provide: DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG,
          useValue: type,
          multi: true,
        },
      ],
    };
  }

  static withGroupValidators(
    types: (DynamicFormGroupValidatorType | DynamicFormGroupAsyncValidatorType)[],
  ): ModuleWithProviders<DynamicFormValidationModule> {
    return {
      ngModule: DynamicFormValidationModule,
      providers: [
        {
          provide: DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG,
          useValue: types,
          multi: true,
        },
      ],
    };
  }

  static withGroupValidatorFactory(
    typeFactory: (...depTypes: any[]) => DynamicFormGroupValidatorType | DynamicFormGroupAsyncValidatorType, deps?: any[],
  ): ModuleWithProviders<DynamicFormValidationModule> {
    return {
      ngModule: DynamicFormValidationModule,
      providers: [
        {
          provide: DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG,
          useFactory: typeFactory,
          deps,
          multi: true,
        },
      ],
    };
  }

  static withArrayValidator(
    type: DynamicFormArrayValidatorType | DynamicFormArrayAsyncValidatorType,
  ): ModuleWithProviders<DynamicFormValidationModule> {
    return {
      ngModule: DynamicFormValidationModule,
      providers: [
        {
          provide: DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG,
          useValue: type,
          multi: true,
        },
      ],
    };
  }

  static withArrayValidators(
    types: (DynamicFormArrayValidatorType | DynamicFormArrayAsyncValidatorType)[],
  ): ModuleWithProviders<DynamicFormValidationModule> {
    return {
      ngModule: DynamicFormValidationModule,
      providers: [
        {
          provide: DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG,
          useValue: types,
          multi: true,
        },
      ],
    };
  }

  static withArrayValidatorFactory(
    typeFactory: (...depTypes: any[]) => DynamicFormArrayValidatorType | DynamicFormArrayAsyncValidatorType, deps?: any[],
  ): ModuleWithProviders<DynamicFormValidationModule> {
    return {
      ngModule: DynamicFormValidationModule,
      providers: [
        {
          provide: DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG,
          useFactory: typeFactory,
          deps,
          multi: true,
        },
      ],
    };
  }

  static withDictionaryValidator(
    type: DynamicFormDictionaryValidatorType | DynamicFormDictionaryAsyncValidatorType,
  ): ModuleWithProviders<DynamicFormValidationModule> {
    return {
      ngModule: DynamicFormValidationModule,
      providers: [
        {
          provide: DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG,
          useValue: type,
          multi: true,
        },
      ],
    };
  }

  static withDictionaryValidators(
    types: (DynamicFormDictionaryValidatorType | DynamicFormDictionaryAsyncValidatorType)[],
  ): ModuleWithProviders<DynamicFormValidationModule> {
    return {
      ngModule: DynamicFormValidationModule,
      providers: [
        {
          provide: DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG,
          useValue: types,
          multi: true,
        },
      ],
    };
  }

  static withDictionaryValidatorFactory(
    typeFactory: (...depTypes: any[]) => DynamicFormDictionaryValidatorType | DynamicFormDictionaryAsyncValidatorType, deps?: any[],
  ): ModuleWithProviders<DynamicFormValidationModule> {
    return {
      ngModule: DynamicFormValidationModule,
      providers: [
        {
          provide: DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG,
          useFactory: typeFactory,
          deps,
          multi: true,
        },
      ],
    };
  }

  static withValidation(config?: DynamicFormValidationConfig): ModuleWithProviders<DynamicFormValidationModule> {
    return {
      ngModule: DynamicFormValidationModule,
      providers: [
        {
          provide: DYNAMIC_FORM_VALIDATION_CONFIGS,
          useValue: config || dynamicFormValidationConfig,
          multi: true,
        },
      ],
    };
  }
}
