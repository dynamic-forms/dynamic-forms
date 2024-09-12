import { DynamicFormArrayAsyncValidatorType, DynamicFormArrayValidatorType } from '../dynamic-form-array/dynamic-form-array-validator-type';
import { DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-array/dynamic-form-array-validator-type-config';
import {
  DynamicFormControlAsyncValidatorType,
  DynamicFormControlValidatorType,
} from '../dynamic-form-control/dynamic-form-control-validator-type';
import { DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-control/dynamic-form-control-validator-type-config';
import {
  DynamicFormDictionaryAsyncValidatorType,
  DynamicFormDictionaryValidatorType,
} from '../dynamic-form-dictionary/dynamic-form-dictionary-validator-type';
import { DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-dictionary/dynamic-form-dictionary-validator-type-config';
import { DynamicFormGroupAsyncValidatorType, DynamicFormGroupValidatorType } from '../dynamic-form-group/dynamic-form-group-validator-type';
import { DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-group/dynamic-form-group-validator-type-config';
import { DynamicFormsFeature } from '../dynamic-forms-feature';
import {
  DYNAMIC_FORM_VALIDATION_CONFIGS,
  DynamicFormValidationConfig,
  dynamicFormValidationConfig,
} from './dynamic-form-validation-config';
import { DynamicFormValidationBuilder } from './dynamic-form-validation.builder';
import { DynamicFormValidationService } from './dynamic-form-validation.service';

export const dynamicFormValidationProviders = [DynamicFormValidationBuilder, DynamicFormValidationService];

export function withDynamicFormControlValidators(
  ...types: (DynamicFormControlValidatorType | DynamicFormControlAsyncValidatorType)[]
): DynamicFormsFeature {
  const providers = types.map(type => {
    return {
      provide: DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG,
      useValue: type,
      multi: true,
    };
  });
  return { providers };
}

export function withDynamicFormControlValidatorFactory(
  typeFactory: (...depTypes: any[]) => DynamicFormControlValidatorType | DynamicFormControlAsyncValidatorType,
  deps?: any[],
): DynamicFormsFeature {
  const provider = { provide: DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG, useFactory: typeFactory, deps, multi: true };
  return { providers: [provider] };
}

export function withDynamicFormGroupValidators(
  ...types: (DynamicFormGroupValidatorType | DynamicFormGroupAsyncValidatorType)[]
): DynamicFormsFeature {
  const providers = types.map(type => {
    return {
      provide: DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG,
      useValue: type,
      multi: true,
    };
  });
  return { providers };
}

export function withDynamicFormGroupValidatorFactory(
  typeFactory: (...depTypes: any[]) => DynamicFormGroupValidatorType | DynamicFormGroupAsyncValidatorType,
  deps?: any[],
): DynamicFormsFeature {
  const provider = { provide: DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG, useFactory: typeFactory, deps, multi: true };
  return { providers: [provider] };
}

export function withDynamicFormArrayValidators(
  ...types: (DynamicFormArrayValidatorType | DynamicFormArrayAsyncValidatorType)[]
): DynamicFormsFeature {
  const providers = types.map(type => {
    return {
      provide: DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG,
      useValue: type,
      multi: true,
    };
  });
  return { providers };
}

export function withDynamicFormArrayValidatorFactory(
  typeFactory: (...depTypes: any[]) => DynamicFormArrayValidatorType | DynamicFormArrayAsyncValidatorType,
  deps?: any[],
): DynamicFormsFeature {
  const provider = { provide: DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG, useFactory: typeFactory, deps, multi: true };
  return { providers: [provider] };
}

export function withDynamicFormDictionaryValidators(
  ...types: (DynamicFormDictionaryValidatorType | DynamicFormDictionaryAsyncValidatorType)[]
): DynamicFormsFeature {
  const providers = types.map(type => {
    return {
      provide: DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG,
      useValue: type,
      multi: true,
    };
  });
  return { providers };
}

export function withDynamicFormDictionaryValidatorFactory(
  typeFactory: (...depTypes: any[]) => DynamicFormDictionaryValidatorType | DynamicFormDictionaryAsyncValidatorType,
  deps?: any[],
): DynamicFormsFeature {
  const provider = { provide: DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG, useFactory: typeFactory, deps, multi: true };
  return { providers: [provider] };
}

export function withDynamicFormValidation(config?: DynamicFormValidationConfig): DynamicFormsFeature {
  const provider = { provide: DYNAMIC_FORM_VALIDATION_CONFIGS, useValue: config || dynamicFormValidationConfig, multi: true };
  return { providers: [provider] };
}

export function withDynamicFormValidationDefaults(additionalConfig?: DynamicFormValidationConfig): DynamicFormsFeature[] {
  return [withDynamicFormValidation(), withDynamicFormValidation(additionalConfig)];
}
