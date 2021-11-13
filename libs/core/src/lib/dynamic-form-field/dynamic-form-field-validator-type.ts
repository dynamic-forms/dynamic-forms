import { DynamicFormLibraryName } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormFieldAsyncValidatorFactory, DynamicFormFieldValidatorFactory } from './dynamic-form-field-validator';

export interface DynamicFormFieldValidatorType<
  ValidatorFactory extends DynamicFormFieldValidatorFactory = DynamicFormFieldValidatorFactory
> {
  type: string;
  async?: false;
  factory: ValidatorFactory;
  libraryName: DynamicFormLibraryName;
}

export interface DynamicFormFieldAsyncValidatorType<
  ValidatorFactory extends DynamicFormFieldAsyncValidatorFactory = DynamicFormFieldAsyncValidatorFactory
> {
  type: string;
  async: true;
  factory: ValidatorFactory;
  libraryName: DynamicFormLibraryName;
}
