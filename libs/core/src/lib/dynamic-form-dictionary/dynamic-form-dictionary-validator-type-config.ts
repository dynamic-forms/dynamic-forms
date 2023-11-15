import { InjectionToken } from '@angular/core';
import { DynamicFormDictionaryAsyncValidatorType, DynamicFormDictionaryValidatorType } from './dynamic-form-dictionary-validator-type';

export type DynamicFormDictionaryValidatorTypeConfig = (
  | DynamicFormDictionaryValidatorType
  | DynamicFormDictionaryAsyncValidatorType
  | (DynamicFormDictionaryValidatorType | DynamicFormDictionaryAsyncValidatorType)[]
)[];

export const DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG = new InjectionToken<DynamicFormDictionaryValidatorTypeConfig>(
  'DynamicFormDictionaryValidatorTypeConfig',
);
