import { FormGroup } from '@angular/forms';
import { DynamicFormFieldValidatorType } from '../dynamic-form-field/dynamic-form-field-validator-type';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormDictionaryValidatorFn } from './dynamic-form-dictionary-validator';

export interface DynamicFormDictionaryValidatorType extends DynamicFormFieldValidatorType<FormGroup> {}

export function dynamicFormDictionaryMinLengthValidatorFactory(minLength?: number): DynamicFormDictionaryValidatorFn {
  if (!Number.isFinite(minLength)) {
    return undefined;
  }

  return (group: FormGroup) => {
    if (!group.value) {
      return null;
    }

    const actualLength = Object.keys(group.value).length;
    return actualLength < minLength ? { minlengthDictionary: { requiredLength: minLength, actualLength } } : null;
  };

}

export const dynamicFormDictionaryMinLengthValidatorType: DynamicFormDictionaryValidatorType = {
  type: 'minLength',
  factory: dynamicFormDictionaryMinLengthValidatorFactory,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormDictionaryMaxLengthValidatorFactory(maxLength?: number): DynamicFormDictionaryValidatorFn {
  if (!Number.isFinite(maxLength)) {
    return undefined;
  }

  return (group: FormGroup) => {
    if (!group.value) {
      return null;
    }

    const actualLength = Object.keys(group.value).length;
    return actualLength > maxLength ? { maxlengthDictionary: { requiredLength: maxLength, actualLength } } : null;
  };
}

export const dynamicFormDictionaryMaxLengthValidatorType: DynamicFormDictionaryValidatorType = {
  type: 'maxLength',
  factory: dynamicFormDictionaryMaxLengthValidatorFactory,
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormDictionaryValidatorTypes: DynamicFormDictionaryValidatorType[] = [
  dynamicFormDictionaryMinLengthValidatorType,
  dynamicFormDictionaryMaxLengthValidatorType
];
