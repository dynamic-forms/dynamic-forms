import { FormGroup } from '@angular/forms';
import { DynamicFormFieldValidatorType } from '../dynamic-form-field/dynamic-form-field-validator-type';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormGroupValidatorFn } from './dynamic-form-group-validator';

export interface DynamicFormGroupValidatorType extends DynamicFormFieldValidatorType<FormGroup> {}

export function dynamicFormGroupRequiredValidatorFactory(_param?: any): DynamicFormGroupValidatorFn {
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

export const dynamicFormGroupValidatorTypes: DynamicFormGroupValidatorType[] = [
  dynamicFormGroupRequiredValidatorType
];
