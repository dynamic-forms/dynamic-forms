import { FormGroup } from '@angular/forms';
import { DynamicFormFieldValidatorType } from '../dynamic-form-field/dynamic-form-field-validator-type';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormGroupValidatorFn } from './dynamic-form-group-validator';

export interface DynamicFormGroupValidatorType extends DynamicFormFieldValidatorType<FormGroup> {}

export function dynamicFormGroupRequiredValidatorFn(_param?: any): DynamicFormGroupValidatorFn {
  return (group: FormGroup) => group.value ? null : { requiredGroup: true };
}

export const dynamicFormGroupRequiredValidatorType: DynamicFormGroupValidatorType = {
  type: 'required',
  factory: dynamicFormGroupRequiredValidatorFn,
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormGroupValidatorTypes: DynamicFormGroupValidatorType[] = [
  dynamicFormGroupRequiredValidatorType
];
