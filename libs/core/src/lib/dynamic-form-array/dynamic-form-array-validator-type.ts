import { dynamicFormLibrary, DynamicFormLibraryName } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormArrayValidatorFactory, DynamicFormArrayValidatorFn } from './dynamic-form-array-validator';

export interface DynamicFormArrayValidatorType {
  type: string;
  factory: DynamicFormArrayValidatorFactory;
  libraryName: DynamicFormLibraryName;
}

export function dynamicFormArrayMinLengthValidatorFn(minLength?: number): DynamicFormArrayValidatorFn {
  return Number.isFinite(minLength) ? undefined : undefined;
}

export const dynamicFormArrayMinLengthValidatorType: DynamicFormArrayValidatorType = {
  type: 'minArrayLength',
  factory: dynamicFormArrayMinLengthValidatorFn,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormArrayMaxLengthValidatorFn(maxLength?: number): DynamicFormArrayValidatorFn {
  return Number.isFinite(maxLength) ? undefined : undefined;
}

export const dynamicFormArrayMaxLengthValidatorType: DynamicFormArrayValidatorType = {
  type: 'maxArrayLength',
  factory: dynamicFormArrayMaxLengthValidatorFn,
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormArrayValidatorTypes: DynamicFormArrayValidatorType[] = [
  dynamicFormArrayMinLengthValidatorType,
  dynamicFormArrayMaxLengthValidatorType
];
