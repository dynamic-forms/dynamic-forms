import { DynamicFormLibraryName } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormFieldValidatorFactory } from './dynamic-form-field-validator';

export interface DynamicFormFieldValidatorType<
  ValidatorFactory extends DynamicFormFieldValidatorFactory = DynamicFormFieldValidatorFactory
> {
  type: string;
  factory: ValidatorFactory;
  libraryName: DynamicFormLibraryName;
}
