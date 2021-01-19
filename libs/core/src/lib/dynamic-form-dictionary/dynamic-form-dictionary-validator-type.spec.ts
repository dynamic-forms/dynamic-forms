import { FormGroup } from '@angular/forms';
import { dynamicFormDictionaryMaxLengthValidatorFactory, dynamicFormDictionaryMinLengthValidatorFactory,
  dynamicFormDictionaryRequiredValidatorFactory } from './dynamic-form-dictionary-validator-type';

describe('DynamicFormDictionaryValidatorType', () => {
  it('dynamicFormDictionaryRequiredValidatorFactory returns validatorFn' , () => {
    const validatorFn = dynamicFormDictionaryRequiredValidatorFactory();

    expect(validatorFn).toBeTruthy();
  });

  it('validatorFn of dynamicFormDictionaryRequiredValidatorFactory returns no error' , () => {
    const validatorFn = dynamicFormDictionaryRequiredValidatorFactory();
    const formGroup = <FormGroup>{ value: { key: undefined } };

    expect(validatorFn(formGroup)).toBeNull();
  });

  it('validatorFn of dynamicFormDictionaryRequiredValidatorFactory returns error if value is undefined' , () => {
    const validatorFn = dynamicFormDictionaryRequiredValidatorFactory();
    const formGroup = <FormGroup>{ value: undefined };

    expect(validatorFn(formGroup)).toEqual({ requiredDictionary: true });
  });

  it('validatorFn of dynamicFormDictionaryRequiredValidatorFactory returns error if value is null' , () => {
    const validatorFn = dynamicFormDictionaryRequiredValidatorFactory();
    const formGroup = <FormGroup>{ value: null };

    expect(validatorFn(formGroup)).toEqual({ requiredDictionary: true });
  });

  it('validatorFn of dynamicFormDictionaryRequiredValidatorFactory returns error if value is empty' , () => {
    const validatorFn = dynamicFormDictionaryRequiredValidatorFactory();
    const formGroup = <FormGroup>{ value: {} };

    expect(validatorFn(formGroup)).toEqual({ requiredDictionary: true });
  });

  it('dynamicFormDictionaryMinLengthValidatorFactory returns validatorFn being undefined' , () => {
    const validatorFn = dynamicFormDictionaryMinLengthValidatorFactory(null);

    expect(validatorFn).toBeUndefined();
  });

  it('dynamicFormDictionaryMinLengthValidatorFactory returns validatorFn' , () => {
    const validatorFn = dynamicFormDictionaryMinLengthValidatorFactory(1);

    expect(validatorFn).toBeTruthy();
  });

  it('validatorFn of dynamicFormDictionaryMinLengthValidatorFactory returns no error' , () => {
    const validatorFn = dynamicFormDictionaryMinLengthValidatorFactory(1);
    const formGroup = <FormGroup>{ value: { value1: undefined } };

    expect(validatorFn(formGroup)).toBeNull();
  });

  it('validatorFn of dynamicFormDictionaryMinLengthValidatorFactory returns no error if value is not defined' , () => {
    const validatorFn = dynamicFormDictionaryMinLengthValidatorFactory(1);
    const formGroup = <FormGroup>{ value: null };

    expect(validatorFn(formGroup)).toBeNull();
  });

  it('validatorFn of dynamicFormDictionaryMinLengthValidatorFactory returns error' , () => {
    const validatorFn = dynamicFormDictionaryMinLengthValidatorFactory(1);
    const formGroup = <FormGroup>{ value: {} };

    expect(validatorFn(formGroup)).toEqual({ minlengthDictionary: { requiredLength: 1, actualLength: 0 } });
  });

  it('dynamicFormDictionaryMaxLengthValidatorFactory returns validatorFn being undefined' , () => {
    const validatorFn = dynamicFormDictionaryMaxLengthValidatorFactory(null);

    expect(validatorFn).toBeUndefined();
  });

  it('dynamicFormDictionaryMaxLengthValidatorFactory returns validatorFn' , () => {
    const validatorFn = dynamicFormDictionaryMaxLengthValidatorFactory(2);

    expect(validatorFn).toBeTruthy();
  });

  it('validatorFn of dynamicFormDictionaryMaxLengthValidatorFactory returns no error' , () => {
    const validatorFn = dynamicFormDictionaryMaxLengthValidatorFactory(2);
    const formGroup = <FormGroup>{ value: { value1: undefined, value2: undefined } };

    expect(validatorFn(formGroup)).toBeNull();
  });

  it('validatorFn of dynamicFormDictionaryMaxLengthValidatorFactory returns no error if value is not defined' , () => {
    const validatorFn = dynamicFormDictionaryMaxLengthValidatorFactory(2);
    const formGroup = <FormGroup>{ value: null };

    expect(validatorFn(formGroup)).toBeNull();
  });

  it('validatorFn of dynamicFormArrayMaxLengthValidatorFactory returns error' , () => {
    const validatorFn = dynamicFormDictionaryMaxLengthValidatorFactory(2);
    const formGroup = <FormGroup>{ value: { value1: undefined, value2: undefined, value3: undefined } };

    expect(validatorFn(formGroup)).toEqual({ maxlengthDictionary: { requiredLength: 2, actualLength: 3 } });
  });
});
