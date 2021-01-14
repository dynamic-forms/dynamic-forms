import { FormArray } from '@angular/forms';
import { DynamicFormFieldValidatorDefinition } from '../dynamic-form-field/dynamic-form-field-validator-definition';
import { DynamicFormArray } from './dynamic-form-array';
import { DynamicFormArrayValidation } from './dynamic-form-array-validation';
import { DynamicFormArrayValidator } from './dynamic-form-array-validator';

describe('DynamicFormArrayValidator', () => {
  it('creates instance', () => {
    const array = <DynamicFormArray>{ definition: {}, template: { minLength: 3, validation: { minLength: true } } };
    const factory = (minLength: number) => {
      return Number.isFinite(minLength)
        ? (formArray: FormArray) => formArray.value && formArray.value.length < minLength && { error: true } || null
        : undefined;
    };
    const validator = new DynamicFormArrayValidator('minLength', array, factory);

    expect(validator.key).toBe('minLength');
    expect(validator.field).toBe(array);
    expect(validator.factory).toBe(factory);

    expect(validator.definition).toBeUndefined();
    expect(validator.message).toBeUndefined();

    expect(validator.enabled).toBe(true);
    expect(validator.parameters).toBe(3);
    expect(validator.validatorFn).toBeTruthy();
  });

  it('creates  instance for validator definition', () => {
    const minMaxLength = <DynamicFormFieldValidatorDefinition> {
      type: 'minMaxLength',
      parameters: {
        minLength: 3,
        maxLength: 5
      },
      message: 'message'
    };
    const validators = <{ [key: string]: DynamicFormFieldValidatorDefinition }>{ minMaxLength };
    const validation = <DynamicFormArrayValidation>{ minMaxLength: true };
    const array = <DynamicFormArray>{ definition: { validators }, template: { validation } };
    const factory = (parameters: { minLength?: number, maxLength?: number }) => {
      return Number.isFinite(parameters.minLength) && Number.isFinite(parameters.maxLength)
        ? (formArray: FormArray) => formArray.value
            ? formArray.value.length < parameters.minLength || formArray.value.length > parameters.maxLength
              ? { error: true }
              : null
            : null
        : undefined;
    };
    const validator = new DynamicFormArrayValidator('minMaxLength', array, factory);

    expect(validator.key).toBe('minMaxLength');
    expect(validator.field).toBe(array);
    expect(validator.factory).toBe(factory);

    expect(validator.definition).toBe(minMaxLength);
    expect(validator.message).toBe('message');

    expect(validator.enabled).toBe(true);
    expect(validator.parameters).toBe(minMaxLength.parameters);
    expect(validator.validatorFn).toBeTruthy();
  });

  it('creating instance throws exception if definition not valid', () => {
    const array = <DynamicFormArray>{ template: { minLength: 3, validation: { minLength: true } } };
    const factory = (minLength: number) => {
      return Number.isFinite(minLength)
        ? (formArray: FormArray) => formArray.value && formArray.value.length < minLength && { error: true } || null
        : undefined;
    };

    expect(() => new DynamicFormArrayValidator('minLength', array, factory)).toThrowError();
  });

  it('creating instance throws exception if validation not valid', () => {
    const array = <DynamicFormArray>{ definition: {}, template: { minLength: 3, validation: null } };
    const factory = (minLength: number) => {
      return Number.isFinite(minLength)
        ? (formArray: FormArray) => formArray.value && formArray.value.length < minLength && { error: true } || null
        : undefined;
    };

    expect(() => new DynamicFormArrayValidator('minLength', array, factory)).toThrowError();
  });

  it('creating instance throws exception if factory not valid', () => {
    const array = <DynamicFormArray>{ definition: {}, template: { validation: { minLength: true } } };

    expect(() => new DynamicFormArrayValidator('minLength', array, null)).toThrowError();
  });

  it('checkChanges returns false', () => {
    const array = <DynamicFormArray>{ definition: {}, template: { validation: { minLength: true } } };
    const factory = (minLength: number) => {
      return Number.isFinite(minLength)
        ? (formArray: FormArray) => formArray.value && formArray.value.length < minLength && { error: true } || null
        : undefined;
    };
    const validator = new DynamicFormArrayValidator('minLength', array, factory);

    const changes = validator.checkChanges();

    expect(changes).toBe(false);
  });

  it('checkChanges updates validatorFn and returns true if enabled changes', () => {
    const array = <DynamicFormArray>{ definition: {}, template: { minLength: 3, validation: { minLength: true } } };
    const factory = (minLength: number) => {
      return Number.isFinite(minLength)
        ? (formArray: FormArray) => formArray.value && formArray.value.length < minLength && { error: true } || null
        : undefined;
    };
    const validator = new DynamicFormArrayValidator('minLength', array, factory);

    expect(validator.enabled).toBe(true);
    expect(validator.validatorFn).toBeTruthy();

    array.template.validation.minLength = false;
    const changes = validator.checkChanges();

    expect(changes).toBe(true);
    expect(validator.enabled).toBe(false);
    expect(validator.validatorFn).toBeUndefined();
  });

  it('checkChanges updates validatorFn and returns true if parameters changes', () => {
    const array = <DynamicFormArray>{ definition: {}, template: { minLength: 3, validation: { minLength: true } } };
    const factory = (minLength: number) => {
      return Number.isFinite(minLength)
        ? (formArray: FormArray) => formArray.value && formArray.value.length < minLength && { error: true } || null
        : undefined;
    };
    const validator = new DynamicFormArrayValidator('minLength', array, factory);

    expect(validator.parameters).toBe(3);
    expect(validator.validatorFn).toBeTruthy();

    array.template.minLength = null;
    const changes = validator.checkChanges();

    expect(changes).toBe(true);
    expect(validator.parameters).toBe(null);
    expect(validator.validatorFn).toBeUndefined();
  });
});
