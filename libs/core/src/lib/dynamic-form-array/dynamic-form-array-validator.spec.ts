import { FormArray } from '@angular/forms';
import { DynamicFormArray } from './dynamic-form-array';
import { DynamicFormArrayValidator } from './dynamic-form-array-validator';

describe('DynamicFormArrayValidator', () => {
  it('new instance', () => {
    const array = <DynamicFormArray>{ template: { minLength: 3, validation: { minLength: true } } };
    const factory = (minLength: number) => {
      return Number.isFinite(minLength)
        ? (formArray: FormArray) => formArray.value && formArray.value.length < minLength && { error: true } || null
        : undefined;
    };
    const validator = new DynamicFormArrayValidator('minLength', array, factory);

    expect(validator.key).toBe('minLength');
    expect(validator.field).toBe(array);
    expect(validator.factory).toBe(factory);

    expect(validator.enabled).toBe(true);
    expect(validator.parameters).toBe(3);
    expect(validator.validatorFn).toBeDefined();
  });

  it('new instance throws exception if validation not valid', () => {
    const array = <DynamicFormArray>{ template: { minLength: 3, validation: null } };
    const factory = (minLength: number) => {
      return Number.isFinite(minLength)
        ? (formArray: FormArray) => formArray.value && formArray.value.length < minLength && { error: true } || null
        : undefined;
    };

    expect(() => new DynamicFormArrayValidator('minLength', array, factory)).toThrowError();
  });

  it('new instance throws exception if factory not valid', () => {
    const array = <DynamicFormArray>{ template: { validation: { minLength: true } } };

    expect(() => new DynamicFormArrayValidator('minLength', array, null)).toThrowError();
  });

  it('checkChanges returns false', () => {
    const array = <DynamicFormArray>{ template: { validation: { minLength: true } } };
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
    const array = <DynamicFormArray>{ template: { minLength: 3, validation: { minLength: true } } };
    const factory = (minLength: number) => {
      return Number.isFinite(minLength)
        ? (formArray: FormArray) => formArray.value && formArray.value.length < minLength && { error: true } || null
        : undefined;
    };
    const validator = new DynamicFormArrayValidator('minLength', array, factory);

    expect(validator.enabled).toBe(true);
    expect(validator.validatorFn).toBeDefined();

    array.template.validation.minLength = false;
    const changes = validator.checkChanges();

    expect(changes).toBe(true);
    expect(validator.enabled).toBe(false);
    expect(validator.validatorFn).toBeUndefined();
  });

  it('checkChanges updates validatorFn and returns true if parameters changes', () => {
    const array = <DynamicFormArray>{ template: { minLength: 3, validation: { minLength: true } } };
    const factory = (minLength: number) => {
      return Number.isFinite(minLength)
        ? (formArray: FormArray) => formArray.value && formArray.value.length < minLength && { error: true } || null
        : undefined;
    };
    const validator = new DynamicFormArrayValidator('minLength', array, factory);

    expect(validator.parameters).toBe(3);
    expect(validator.validatorFn).toBeDefined();

    array.template.minLength = null;
    const changes = validator.checkChanges();

    expect(changes).toBe(true);
    expect(validator.parameters).toBe(null);
    expect(validator.validatorFn).toBeUndefined();
  });
});
