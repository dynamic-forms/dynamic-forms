import { FormGroup } from '@angular/forms';
import { dynamicFormGroupRequiredValidatorFactory } from './dynamic-form-group-validator-type';

describe('DynamicFormGroupValidatorType', () => {
  it('dynamicFormGroupRequiredValidatorFactory returns validatorFn' , () => {
    const validatorFn = dynamicFormGroupRequiredValidatorFactory();

    expect(validatorFn).toBeDefined();
  });

  it('validatorFn of dynamicFormGroupRequiredValidatorFactory returns no error' , () => {
    const validatorFn = dynamicFormGroupRequiredValidatorFactory();
    const group = <FormGroup>{ value: { value1: 'value1', value2: 'value2' } };

    expect(validatorFn(group)).toBeNull();
  });

  it('validatorFn of dynamicFormGroupRequiredValidatorFactory returns no error' , () => {
    const validatorFn = dynamicFormGroupRequiredValidatorFactory();
    const group = <FormGroup>{ value: null };

    expect(validatorFn(group)).toBeNull();
  });

  it('validatorFn of dynamicFormGroupRequiredValidatorFactory returns no error' , () => {
    const validatorFn = dynamicFormGroupRequiredValidatorFactory();
    const group = <FormGroup>{ value: { value1: null, value2: 'value2' } };

    expect(validatorFn(group)).toEqual({ requiredGroup: true });
  });
});
