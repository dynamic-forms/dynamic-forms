import { FormGroup } from '@angular/forms';
import { dynamicFormGroupEqualValidatorFactory, dynamicFormGroupRequiredValidatorFactory } from './dynamic-form-group-validator-type';

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

  it('validatorFn of dynamicFormGroupRequiredValidatorFactory returns no error if value is not defined' , () => {
    const validatorFn = dynamicFormGroupRequiredValidatorFactory();
    const group = <FormGroup>{ value: undefined };

    expect(validatorFn(group)).toBeNull();
  });

  it('validatorFn of dynamicFormGroupRequiredValidatorFactory returns error' , () => {
    const validatorFn = dynamicFormGroupRequiredValidatorFactory();
    const group = <FormGroup>{ value: { value1: null, value2: 'value2' } };

    expect(validatorFn(group)).toEqual({ requiredGroup: true });
  });

  it('dynamicFormGroupEqualValidatorFactory returns validatorFn' , () => {
    const validatorFn = dynamicFormGroupEqualValidatorFactory(null);

    expect(validatorFn).toBeDefined();
  });

  it('validatorFn of dynamicFormGroupEqualValidatorFactory returns no error' , () => {
    const validatorFn = dynamicFormGroupEqualValidatorFactory({ keys: [ 'value1', 'value2' ] });
    const group = <FormGroup>{ value: { value1: 'value', value2: 'value' } };

    expect(validatorFn(group)).toBeNull();
  });

  it('validatorFn of dynamicFormGroupEqualValidatorFactory returns error if value is not defined' , () => {
    const validatorFn = dynamicFormGroupEqualValidatorFactory({ keys: [ 'value1', 'value2' ] });
    const group = <FormGroup>{ value: undefined };

    expect(validatorFn(group)).toBeNull();
  });

  it('validatorFn of dynamicFormGroupEqualValidatorFactory returns error' , () => {
    const validatorFn = dynamicFormGroupEqualValidatorFactory({ keys: [ 'value1', 'value2' ] }, 'message');
    const group = <FormGroup>{ value: { value1: 'value1', value2: 'value2' } };

    expect(validatorFn(group)).toEqual({ equal: { message: 'message' }});
  });

  it('validatorFn of dynamicFormGroupEqualValidatorFactory returns error' , () => {
    const validatorFn = dynamicFormGroupEqualValidatorFactory({ keys: [ 'password', 'confirmPassword' ] }, 'password message', 'password');
    const group = <FormGroup>{ value: { password: 'Test12345', confirmPassword: 'Test1234' } };

    expect(validatorFn(group)).toEqual({ password: { message: 'password message' }});
  });
});
