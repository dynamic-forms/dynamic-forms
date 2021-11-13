import { FormArray } from '@angular/forms';
import { DynamicFormFieldAsyncValidatorType, DynamicFormFieldValidatorType } from '../dynamic-form-field/dynamic-form-field-validator-type';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import {
  DynamicFormArrayAsyncValidatorFactory, DynamicFormArrayValidatorFactory, DynamicFormArrayValidatorFn
} from './dynamic-form-array-validator';

export interface DynamicFormArrayValidatorType extends DynamicFormFieldValidatorType<DynamicFormArrayValidatorFactory> {}

export interface DynamicFormArrayAsyncValidatorType extends DynamicFormFieldAsyncValidatorType<DynamicFormArrayAsyncValidatorFactory> {}

export const dynamicFormArrayRequiredValidatorFactory = (): DynamicFormArrayValidatorFn => (array: FormArray) =>
  !array.value || array.value.length === 0 ? { requiredArray: true } : null;

export const dynamicFormArrayRequiredValidatorType: DynamicFormArrayValidatorType = {
  type: 'required',
  factory: dynamicFormArrayRequiredValidatorFactory,
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormArrayMinLengthValidatorFactory = (minLength?: number): DynamicFormArrayValidatorFn => {
  const validatorFn = (array: FormArray) =>
    array.value && array.value.length < minLength
      ? { minlengthArray: { requiredLength: minLength, actualLength: array.value.length } }
      : null;
  return Number.isFinite(minLength) ? validatorFn : undefined;
};

export const dynamicFormArrayMinLengthValidatorType: DynamicFormArrayValidatorType = {
  type: 'minLength',
  factory: dynamicFormArrayMinLengthValidatorFactory,
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormArrayMaxLengthValidatorFactory = (maxLength?: number): DynamicFormArrayValidatorFn => {
  const validatorFn = (array: FormArray) =>
    array.value && array.value.length > maxLength
      ? { maxlengthArray: { requiredLength: maxLength, actualLength: array.value.length } }
      : null;
  return Number.isFinite(maxLength) ? validatorFn : undefined;
};

export const dynamicFormArrayMaxLengthValidatorType: DynamicFormArrayValidatorType = {
  type: 'maxLength',
  factory: dynamicFormArrayMaxLengthValidatorFactory,
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormArrayValidatorTypes: DynamicFormArrayValidatorType[] = [
  dynamicFormArrayRequiredValidatorType,
  dynamicFormArrayMinLengthValidatorType,
  dynamicFormArrayMaxLengthValidatorType
];
