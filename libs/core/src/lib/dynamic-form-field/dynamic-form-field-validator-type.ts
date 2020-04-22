import { DynamicFormLibraryName } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormFieldControl } from './dynamic-form-field-control';
import { DynamicFormFieldValidatorFactory } from './dynamic-form-field-validator';

export interface DynamicFormFieldValidatorType<Control extends DynamicFormFieldControl> {
  type: string;
  factory: DynamicFormFieldValidatorFactory<Control>;
  libraryName: DynamicFormLibraryName;
}
