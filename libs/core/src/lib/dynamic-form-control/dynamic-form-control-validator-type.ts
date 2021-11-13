import { Validators } from '@angular/forms';
import { DynamicFormFieldAsyncValidatorType, DynamicFormFieldValidatorType } from '../dynamic-form-field/dynamic-form-field-validator-type';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import {
  DynamicFormControlAsyncValidatorFactory, DynamicFormControlValidatorFactory, DynamicFormControlValidatorFn
} from './dynamic-form-control-validator';

export interface DynamicFormControlValidatorType extends DynamicFormFieldValidatorType<DynamicFormControlValidatorFactory> {}

export interface DynamicFormControlAsyncValidatorType extends DynamicFormFieldAsyncValidatorType<DynamicFormControlAsyncValidatorFactory> {}

export const dynamicFormControlRequiredValidatorFactory = (): DynamicFormControlValidatorFn => Validators.required;

export const dynamicFormControlRequiredValidatorType: DynamicFormControlValidatorType = {
  type: 'required',
  factory: dynamicFormControlRequiredValidatorFactory,
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormControlEmailValidatorFactory = (): DynamicFormControlValidatorFn => Validators.email;

export const dynamicFormControlEmailValidatorType: DynamicFormControlValidatorType = {
  type: 'email',
  factory: dynamicFormControlEmailValidatorFactory,
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormControlPatternValidatorFactory = (pattern?: string | RegExp): DynamicFormControlValidatorFn =>
  pattern ? Validators.pattern(pattern) : undefined;

export const dynamicFormControlPatternValidatorType: DynamicFormControlValidatorType = {
  type: 'pattern',
  factory: dynamicFormControlPatternValidatorFactory,
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormControlMinValidatorFactory = (min?: number): DynamicFormControlValidatorFn =>
  Number.isFinite(min) ? Validators.min(min) : undefined;

export const dynamicFormControlMinValidatorType: DynamicFormControlValidatorType = {
  type: 'min',
  factory: dynamicFormControlMinValidatorFactory,
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormControlMaxValidatorFactory = (max?: number): DynamicFormControlValidatorFn =>
  Number.isFinite(max) ? Validators.max(max) : undefined;

export const dynamicFormControlMaxValidatorType: DynamicFormControlValidatorType = {
  type: 'max',
  factory: dynamicFormControlMaxValidatorFactory,
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormControlMinLengthValidatorFactory = (minLength?: number): DynamicFormControlValidatorFn =>
  Number.isFinite(minLength) ? Validators.minLength(minLength) : undefined;

export const dynamicFormControlMinLengthValidatorType: DynamicFormControlValidatorType = {
  type: 'minLength',
  factory: dynamicFormControlMinLengthValidatorFactory,
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormControlMaxLengthValidatorFactory = (maxLength?: number): DynamicFormControlValidatorFn =>
  Number.isFinite(maxLength) ? Validators.maxLength(maxLength) : undefined;

export const dynamicFormControlMaxLengthValidatorType: DynamicFormControlValidatorType = {
  type: 'maxLength',
  factory: dynamicFormControlMaxLengthValidatorFactory,
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormControlValidatorTypes: DynamicFormControlValidatorType[] = [
  dynamicFormControlRequiredValidatorType,
  dynamicFormControlEmailValidatorType,
  dynamicFormControlPatternValidatorType,
  dynamicFormControlMinValidatorType,
  dynamicFormControlMaxValidatorType,
  dynamicFormControlMinLengthValidatorType,
  dynamicFormControlMaxLengthValidatorType
];
