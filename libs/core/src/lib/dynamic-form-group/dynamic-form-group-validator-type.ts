import { dynamicFormLibrary, DynamicFormLibraryName } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormGroupValidatorFactory, DynamicFormGroupValidatorFn } from './dynamic-form-group-validator';

export interface DynamicFormGroupValidatorType {
  type: string;
  factory: DynamicFormGroupValidatorFactory;
  libraryName: DynamicFormLibraryName;
}

export function dynamicFormGroupRequiredValidatorFn(_: any): DynamicFormGroupValidatorFn {
  return null;
}

export const dynamicFormGroupRequiredValidatorType: DynamicFormGroupValidatorType = {
  type: 'required',
  factory: dynamicFormGroupRequiredValidatorFn,
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormGroupValidatorTypes: DynamicFormGroupValidatorType[] = [
  dynamicFormGroupRequiredValidatorType
];
