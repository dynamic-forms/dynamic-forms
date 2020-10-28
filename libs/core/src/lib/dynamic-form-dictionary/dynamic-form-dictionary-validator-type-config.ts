import { InjectionToken } from '@angular/core';
import { DynamicFormDictionaryValidatorType } from './dynamic-form-dictionary-validator-type';

export type DynamicFormDictionaryValidatorTypeConfig = (DynamicFormDictionaryValidatorType | DynamicFormDictionaryValidatorType[])[];

export const DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG =
  new InjectionToken<DynamicFormDictionaryValidatorTypeConfig>('DynamicFormDictionaryValidatorTypeConfig');
