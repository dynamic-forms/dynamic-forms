import { FormGroup } from '@angular/forms';
import { DynamicFormFieldValidatorType } from '../dynamic-form-field/dynamic-form-field-validator-type';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormGroupValidatorFn } from './dynamic-form-group-validator';

export interface DynamicFormGroupValidatorType extends DynamicFormFieldValidatorType<FormGroup> {}

export function dynamicFormGroupRequiredValidatorFactory(): DynamicFormGroupValidatorFn {
  return (group: FormGroup) => {
    const keys = Object.keys(group.value || {});
    return keys.some(key => !group.value[key]) ? { requiredGroup: true } : null;
  };
}

export const dynamicFormGroupRequiredValidatorType: DynamicFormGroupValidatorType = {
  type: 'required',
  factory: dynamicFormGroupRequiredValidatorFactory,
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
  dynamicFormGroupEqualValidatorType
];
