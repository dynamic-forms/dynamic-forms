import { FormArray } from '@angular/forms';
import { DynamicFormFieldValidatorDefinition } from '../dynamic-form-field/dynamic-form-field-validator-definition';
import { DynamicFormArray } from './dynamic-form-array';
import { DynamicFormArrayValidation } from './dynamic-form-array-validation';
import { DynamicFormArrayValidator } from './dynamic-form-array-validator';

describe('DynamicFormArrayValidator', () => {
  it('creates instance', () => {
    const array = { definition: {}, template: { minLength: 3, validation: { minLength: true } } } as DynamicFormArray;
    const factory = (minLength: number) =>
      Number.isFinite(minLength)
        ? (formArray: FormArray) => formArray.value && formArray.value.length < minLength && { error: true } || null
        : undefined;
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
    const minMaxLength = {
      type: 'minMaxLength',
      parameters: {
        minLength: 3,
        maxLength: 5
      },
      message: 'message'
    } as DynamicFormFieldValidatorDefinition;
    const validators = { minMaxLength } as { [key: string]: DynamicFormFieldValidatorDefinition };
    const validation = { minMaxLength: true } as DynamicFormArrayValidation;
    const array = { definition: { validators }, template: { validation } } as DynamicFormArray;
    const factory = (parameters: { minLength?: number; maxLength?: number }) =>
      Number.isFinite(parameters.minLength) && Number.isFinite(parameters.maxLength)
        ? (formArray: FormArray) => formArray.value
            ? formArray.value.length < parameters.minLength || formArray.value.length > parameters.maxLength
              ? { error: true }
              : null
            : null
        : undefined;
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
    const array = { template: { minLength: 3, validation: { minLength: true } } } as DynamicFormArray;
    const factory = (minLength: number) =>
      Number.isFinite(minLength)
        ? (formArray: FormArray) => formArray.value && formArray.value.length < minLength && { error: true } || null
        : undefined;

    expect(() => new DynamicFormArrayValidator('minLength', array, factory)).toThrowError();
  });

  it('creating instance throws exception if validation not valid', () => {
    const array = { definition: {}, template: { minLength: 3, validation: null } } as DynamicFormArray;
    const factory = (minLength: number) =>
      Number.isFinite(minLength)
        ? (formArray: FormArray) => formArray.value && formArray.value.length < minLength && { error: true } || null
        : undefined;

    expect(() => new DynamicFormArrayValidator('minLength', array, factory)).toThrowError();
  });

  it('creating instance throws exception if factory not valid', () => {
    const array = { definition: {}, template: { validation: { minLength: true } } } as DynamicFormArray;

    expect(() => new DynamicFormArrayValidator('minLength', array, null)).toThrowError();
  });

  it('checkChanges returns false', () => {
    const array = { definition: {}, template: { validation: { minLength: true } } } as DynamicFormArray;
    const factory = (minLength: number) =>
      Number.isFinite(minLength)
        ? (formArray: FormArray) => formArray.value && formArray.value.length < minLength && { error: true } || null
        : undefined;
    const validator = new DynamicFormArrayValidator('minLength', array, factory);

    const changes = validator.checkChanges();

    expect(changes).toBe(false);
  });

  it('checkChanges updates validatorFn and returns true if enabled changes', () => {
    const array = { definition: {}, template: { minLength: 3, validation: { minLength: true } } } as DynamicFormArray;
    const factory = (minLength: number) =>
      Number.isFinite(minLength)
        ? (formArray: FormArray) => formArray.value && formArray.value.length < minLength && { error: true } || null
        : undefined;
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
    const array = { definition: {}, template: { minLength: 3, validation: { minLength: true } } } as DynamicFormArray;
    const factory = (minLength: number) =>
      Number.isFinite(minLength)
        ? (formArray: FormArray) => formArray.value && formArray.value.length < minLength && { error: true } || null
        : undefined;
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
