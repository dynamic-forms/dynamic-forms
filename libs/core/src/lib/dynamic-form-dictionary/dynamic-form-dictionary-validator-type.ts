import { UntypedFormGroup } from '@angular/forms';
import { DynamicFormFieldAsyncValidatorType, DynamicFormFieldValidatorType } from '../dynamic-form-field/dynamic-form-field-validator-type';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import {
  DynamicFormDictionaryAsyncValidatorFactory, DynamicFormDictionaryValidatorFactory, DynamicFormDictionaryValidatorFn
} from './dynamic-form-dictionary-validator';

export interface DynamicFormDictionaryValidatorType extends DynamicFormFieldValidatorType<DynamicFormDictionaryValidatorFactory> {}

export interface DynamicFormDictionaryAsyncValidatorType extends
  DynamicFormFieldAsyncValidatorType<DynamicFormDictionaryAsyncValidatorFactory> {}

export const dynamicFormDictionaryRequiredValidatorFactory = (): DynamicFormDictionaryValidatorFn => (group: UntypedFormGroup) =>
  !group.value || Object.keys(group.value).length === 0 ? { requiredDictionary: true } : null;

export const dynamicFormDictionaryRequiredValidatorType: DynamicFormDictionaryValidatorType = {
  type: 'required',
  factory: dynamicFormDictionaryRequiredValidatorFactory,
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormDictionaryMinLengthValidatorFactory = (minLength?: number): DynamicFormDictionaryValidatorFn => {
  if (!Number.isFinite(minLength)) {
    return undefined;
  }

  return (group: UntypedFormGroup) => {
    if (!group.value) {
      return null;
    }

    const actualLength = Object.keys(group.value).length;
    return actualLength < minLength ? { minlengthDictionary: { requiredLength: minLength, actualLength } } : null;
  };
};

export const dynamicFormDictionaryMinLengthValidatorType: DynamicFormDictionaryValidatorType = {
  type: 'minLength',
  factory: dynamicFormDictionaryMinLengthValidatorFactory,
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormDictionaryMaxLengthValidatorFactory = (maxLength?: number): DynamicFormDictionaryValidatorFn => {
  if (!Number.isFinite(maxLength)) {
    return undefined;
  }

  return (group: UntypedFormGroup) => {
    if (!group.value) {
      return null;
    }

    const actualLength = Object.keys(group.value).length;
    return actualLength > maxLength ? { maxlengthDictionary: { requiredLength: maxLength, actualLength } } : null;
  };
};

export const dynamicFormDictionaryMaxLengthValidatorType: DynamicFormDictionaryValidatorType = {
  type: 'maxLength',
  factory: dynamicFormDictionaryMaxLengthValidatorFactory,
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormDictionaryValidatorTypes: DynamicFormDictionaryValidatorType[] = [
  dynamicFormDictionaryRequiredValidatorType,
  dynamicFormDictionaryMinLengthValidatorType,
  dynamicFormDictionaryMaxLengthValidatorType
];
