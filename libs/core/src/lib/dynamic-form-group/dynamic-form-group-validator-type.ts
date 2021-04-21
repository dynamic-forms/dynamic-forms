import { FormGroup } from '@angular/forms';
import { DynamicFormFieldValidatorType } from '../dynamic-form-field/dynamic-form-field-validator-type';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormGroupValidatorFactory, DynamicFormGroupValidatorFn } from './dynamic-form-group-validator';

export interface DynamicFormGroupValidatorType extends DynamicFormFieldValidatorType<DynamicFormGroupValidatorFactory> {}

export function dynamicFormGroupRequiredValidatorFactory(): DynamicFormGroupValidatorFn {
  return (group: FormGroup) => {
    return group.value != null || Object.keys(group.value).length === 0 ? { requiredGroup: true } : null;
  };
}

export const dynamicFormGroupRequiredValidatorType: DynamicFormGroupValidatorType = {
  type: 'required',
  factory: dynamicFormGroupRequiredValidatorFactory,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormGroupAllRequiredValidatorFactory(): DynamicFormGroupValidatorFn {
  return (group: FormGroup) => {
    const keys = Object.keys(group.value || {});
    return keys.some(key => !group.value[key]) ? { allRequiredGroup: true } : null;
  };
}

export const dynamicFormGroupAllRequiredValidatorType: DynamicFormGroupValidatorType = {
  type: 'allRequired',
  factory: dynamicFormGroupAllRequiredValidatorFactory,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormGroupEqualValidatorFactory(
  parameters?: { keys: string[] }, message?: string, key?: string
): DynamicFormGroupValidatorFn {
  return (group: FormGroup) => {
    const keys = parameters && parameters.keys;
    if (group.value && keys && keys.length > 1) {
      for (let i = 1; i < keys.length; i++) {
        if (group.value[keys[i - 1]] !== group.value[keys[i]]) {
          if (key) {
            const error = {};
            error[key] = { message };
            return error;
          }
          return { equal: { message } };
        }
      }
    }
    return null;
  };
}

export const dynamicFormGroupEqualValidatorType: DynamicFormGroupValidatorType = {
  type: 'equal',
  factory: dynamicFormGroupEqualValidatorFactory,
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormGroupValidatorTypes: DynamicFormGroupValidatorType[] = [
  dynamicFormGroupRequiredValidatorType,
  dynamicFormGroupAllRequiredValidatorType,
  dynamicFormGroupEqualValidatorType
];
