import { FormGroup } from '@angular/forms';
import { dynamicFormGroupAllRequiredValidatorFactory, dynamicFormGroupEqualValidatorFactory,
  dynamicFormGroupRequiredValidatorFactory } from './dynamic-form-group-validator-type';

describe('DynamicFormGroupValidatorType', () => {
  it('dynamicFormDictionaryRequiredValidatorFactory returns validatorFn' , () => {
    const validatorFn = dynamicFormGroupRequiredValidatorFactory();

    expect(validatorFn).toBeTruthy();
  });

  it('validatorFn of dynamicFormGroupRequiredValidatorFactory returns no error' , () => {
    const validatorFn = dynamicFormGroupRequiredValidatorFactory();
    const formGroup = <FormGroup>{ value: { key: undefined } };

    expect(validatorFn(formGroup)).toBeNull();
  });

  it('validatorFn of dynamicFormGroupRequiredValidatorFactory returns error if value is undefined' , () => {
    const validatorFn = dynamicFormGroupRequiredValidatorFactory();
    const formGroup = <FormGroup>{ value: undefined };

    expect(validatorFn(formGroup)).toEqual({ requiredGroup: true });
  });

  it('validatorFn of dynamicFormGroupRequiredValidatorFactory returns error if value is null' , () => {
    const validatorFn = dynamicFormGroupRequiredValidatorFactory();
    const formGroup = <FormGroup>{ value: null };

    expect(validatorFn(formGroup)).toEqual({ requiredGroup: true });
  });

  it('validatorFn of dynamicFormGroupRequiredValidatorFactory returns error if value is empty' , () => {
    const validatorFn = dynamicFormGroupRequiredValidatorFactory();
    const formGroup = <FormGroup>{ value: {} };

    expect(validatorFn(formGroup)).toEqual({ requiredGroup: true });
  });

  it('dynamicFormGroupAllRequiredValidatorFactory returns validatorFn' , () => {
    const validatorFn = dynamicFormGroupAllRequiredValidatorFactory();

    expect(validatorFn).toBeTruthy();
  });

  it('validatorFn of dynamicFormGroupAllRequiredValidatorFactory returns no error' , () => {
    const validatorFn = dynamicFormGroupAllRequiredValidatorFactory();
    const group = <FormGroup>{ value: { value1: 'value1', value2: 'value2' } };

    expect(validatorFn(group)).toBeNull();
  });

  it('validatorFn of dynamicFormGroupAllRequiredValidatorFactory returns no error if value is undefined' , () => {
    const validatorFn = dynamicFormGroupAllRequiredValidatorFactory();
    const group = <FormGroup>{ value: undefined };

    expect(validatorFn(group)).toBeNull();
  });

  it('validatorFn of dynamicFormGroupAllRequiredValidatorFactory returns no error if value is null' , () => {
    const validatorFn = dynamicFormGroupAllRequiredValidatorFactory();
    const group = <FormGroup>{ value: null };

    expect(validatorFn(group)).toBeNull();
  });

  it('validatorFn of dynamicFormGroupAllRequiredValidatorFactory returns error' , () => {
    const validatorFn = dynamicFormGroupAllRequiredValidatorFactory();
    const group = <FormGroup>{ value: { value1: null, value2: 'value2' } };

    expect(validatorFn(group)).toEqual({ allRequiredGroup: true });
  });

  it('dynamicFormGroupEqualValidatorFactory returns validatorFn' , () => {
    const validatorFn = dynamicFormGroupEqualValidatorFactory(null);

    expect(validatorFn).toBeTruthy();
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
