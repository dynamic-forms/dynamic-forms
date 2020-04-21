import { FormGroup } from '@angular/forms';
import { dynamicFormGroupRequiredValidatorFn } from './dynamic-form-group-validator-type';

describe('DynamicFormGroupValidatorType', () => {
  it('dynamicFormArrayMinLengthValidatorFactory returns validatorFn' , () => {
    const validatorFn = dynamicFormGroupRequiredValidatorFn();

    expect(validatorFn).toBeDefined();
  });

  it('validatorFn of dynamicFormArrayMinLengthValidatorFactory returns no error' , () => {
    const validatorFn = dynamicFormGroupRequiredValidatorFn();
    const group = <FormGroup>{ value: {} };

    expect(validatorFn(group)).toBeNull();
  });

  it('validatorFn of dynamicFormArrayMinLengthValidatorFactory returns error' , () => {
    const validatorFn = dynamicFormGroupRequiredValidatorFn();
    const group = <FormGroup>{ value: null };

    expect(validatorFn(group)).toEqual({ requiredGroup: true });
  });
});
