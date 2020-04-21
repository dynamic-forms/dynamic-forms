import { FormControl, Validators } from '@angular/forms';
import { DynamicFormFieldValidatorType } from '../dynamic-form-field/dynamic-form-field-validator-type';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormControlValidatorFn } from './dynamic-form-control-validator';

export interface DynamicFormControlValidatorType extends DynamicFormFieldValidatorType<FormControl> {}

export function dynamicFormControlRequiredValidatorFactory(_param?: any): DynamicFormControlValidatorFn {
  return Validators.required;
}

export const dynamicFormControlRequiredValidatorType: DynamicFormControlValidatorType = {
  type: 'required',
  factory: dynamicFormControlRequiredValidatorFactory,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormControlEmailValidatorFactory(_param?: any): DynamicFormControlValidatorFn {
  return Validators.email;
}

export const dynamicFormControlEmailValidatorType: DynamicFormControlValidatorType = {
  type: 'email',
  factory: dynamicFormControlEmailValidatorFactory,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormControlPatternValidatorFactory(pattern?: string | RegExp): DynamicFormControlValidatorFn {
  return pattern ? Validators.pattern(pattern) : undefined;
}

export const dynamicFormControlPatternValidatorType: DynamicFormControlValidatorType = {
  type: 'pattern',
  factory: dynamicFormControlPatternValidatorFactory,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormControlMinValidatorFactory(min?: number): DynamicFormControlValidatorFn {
  return Number.isFinite(min) ? Validators.min(min) : undefined;
}

export const dynamicFormControlMinValidatorType: DynamicFormControlValidatorType = {
  type: 'min',
  factory: dynamicFormControlMinValidatorFactory,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormControlMaxValidatorFactory(max?: number): DynamicFormControlValidatorFn {
  return Number.isFinite(max) ? Validators.max(max) : undefined;
}

export const dynamicFormControlMaxValidatorType: DynamicFormControlValidatorType = {
  type: 'max',
  factory: dynamicFormControlMaxValidatorFactory,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormControlMinLengthValidatorFactory(minLength?: number): DynamicFormControlValidatorFn {
  return Number.isFinite(minLength) ? Validators.minLength(minLength) : undefined;
}

export const dynamicFormControlMinLengthValidatorType: DynamicFormControlValidatorType = {
  type: 'minLength',
  factory: dynamicFormControlMinLengthValidatorFactory,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormControlMaxLengthValidatorFactory(maxLength?: number): DynamicFormControlValidatorFn {
  return Number.isFinite(maxLength) ? Validators.maxLength(maxLength) : undefined;
}

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
