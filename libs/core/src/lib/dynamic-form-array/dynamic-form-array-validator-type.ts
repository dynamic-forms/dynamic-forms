import { dynamicFormLibrary, DynamicFormLibraryName } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormArrayValidatorFactory, DynamicFormArrayValidatorFn } from './dynamic-form-array-validator';

export interface DynamicFormArrayValidatorType {
  type: string;
  factory: DynamicFormArrayValidatorFactory;
  libraryName: DynamicFormLibraryName;
}

export function dynamicFormArrayMinLengthValidatorFn(minLength?: number): DynamicFormArrayValidatorFn {
  return Number.isFinite(minLength) ? null : undefined;
}

export const dynamicFormArrayMinLengthValidatorType: DynamicFormArrayValidatorType = {
  type: 'minLength',
  factory: dynamicFormArrayMinLengthValidatorFn,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormArrayMaxLengthValidatorFn(maxLength?: number): DynamicFormArrayValidatorFn {
  return Number.isFinite(maxLength) ? null : undefined;
}

export const dynamicFormArrayMaxLengthValidatorType: DynamicFormArrayValidatorType = {
  type: 'maxLength',
  factory: dynamicFormArrayMaxLengthValidatorFn,
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormArrayValidatorTypes: DynamicFormArrayValidatorType[] = [
  dynamicFormArrayMinLengthValidatorType,
  dynamicFormArrayMaxLengthValidatorType
];
