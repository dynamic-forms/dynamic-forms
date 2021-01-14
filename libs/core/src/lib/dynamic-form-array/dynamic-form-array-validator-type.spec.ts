import { FormArray } from '@angular/forms';
import { dynamicFormArrayMaxLengthValidatorFactory, dynamicFormArrayMinLengthValidatorFactory } from './dynamic-form-array-validator-type';

describe('DynamicFormArrayValidatorType', () => {
  it('dynamicFormArrayMinLengthValidatorFactory returns validatorFn being undefined' , () => {
    const validatorFn = dynamicFormArrayMinLengthValidatorFactory(null);

    expect(validatorFn).toBeUndefined();
  });

  it('dynamicFormArrayMinLengthValidatorFactory returns validatorFn' , () => {
    const validatorFn = dynamicFormArrayMinLengthValidatorFactory(1);

    expect(validatorFn).toBeTruthy();
  });

  it('validatorFn of dynamicFormArrayMinLengthValidatorFactory returns no error' , () => {
    const validatorFn = dynamicFormArrayMinLengthValidatorFactory(1);
    const formArray = <FormArray>{ value: [ {} ] };

    expect(validatorFn(formArray)).toBeNull();
  });

  it('validatorFn of dynamicFormArrayMinLengthValidatorFactory returns no error if value is not defined' , () => {
    const validatorFn = dynamicFormArrayMinLengthValidatorFactory(1);
    const formArray = <FormArray>{ value: null };

    expect(validatorFn(formArray)).toBeNull();
  });

  it('validatorFn of dynamicFormArrayMinLengthValidatorFactory returns error' , () => {
    const validatorFn = dynamicFormArrayMinLengthValidatorFactory(1);
    const formArray = <FormArray>{ value: [] };

    expect(validatorFn(formArray)).toEqual({ minlengthArray: { requiredLength: 1, actualLength: 0 } });
  });

  it('dynamicFormArrayMaxLengthValidatorFactory returns validatorFn being undefined' , () => {
    const validatorFn = dynamicFormArrayMaxLengthValidatorFactory(null);

    expect(validatorFn).toBeUndefined();
  });

  it('dynamicFormArrayMaxLengthValidatorFactory returns validatorFn' , () => {
    const validatorFn = dynamicFormArrayMaxLengthValidatorFactory(2);

    expect(validatorFn).toBeTruthy();
  });

  it('validatorFn of dynamicFormArrayMaxLengthValidatorFactory returns no error' , () => {
    const validatorFn = dynamicFormArrayMaxLengthValidatorFactory(2);
    const formArray = <FormArray>{ value: [ {}, {} ] };

    expect(validatorFn(formArray)).toBeNull();
  });

  it('validatorFn of dynamicFormArrayMaxLengthValidatorFactory returns no error if value is not defined' , () => {
    const validatorFn = dynamicFormArrayMaxLengthValidatorFactory(2);
    const formArray = <FormArray>{ value: null };

    expect(validatorFn(formArray)).toBeNull();
  });

  it('validatorFn of dynamicFormArrayMaxLengthValidatorFactory returns error' , () => {
    const validatorFn = dynamicFormArrayMaxLengthValidatorFactory(2);
    const formArray = <FormArray>{ value: [ {}, {}, {} ] };

    expect(validatorFn(formArray)).toEqual({ maxlengthArray: { requiredLength: 2, actualLength: 3 } });
  });
});
