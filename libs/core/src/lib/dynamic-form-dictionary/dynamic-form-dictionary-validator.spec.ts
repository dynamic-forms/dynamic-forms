import { FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { DynamicFormFieldValidatorDefinition } from '../dynamic-form-field/dynamic-form-field-validator-definition';
import { DynamicFormDictionary } from './dynamic-form-dictionary';
import { DynamicFormDictionaryValidation } from './dynamic-form-dictionary-validation';
import { DynamicFormDictionaryAsyncValidator, DynamicFormDictionaryValidator } from './dynamic-form-dictionary-validator';

describe('DynamicFormDictionaryValidator', () => {
  it('creates instance', () => {
    const factory = (minLength: number) =>
      Number.isFinite(minLength)
        ? (formGroup: FormGroup) => (formGroup.value && Object.keys(formGroup.value).length < minLength && { error: true }) || null
        : undefined;
    const dictionary = { definition: {}, template: { minLength: 3, validation: { minLength: true } } } as DynamicFormDictionary;
    const validator = new DynamicFormDictionaryValidator(factory, 'minLength', dictionary);

    expect(validator.async).toBeFalse();

    expect(validator.key).toBe('minLength');
    expect(validator.field).toBe(dictionary);
    expect(validator.factory).toBe(factory);

    expect(validator.definition).toBeUndefined();
    expect(validator.message).toBeUndefined();

    expect(validator.enabled).toBe(true);
    expect(validator.parameters).toBe(3);
    expect(validator.validatorFn).toBeTruthy();
  });

  it('creates instance for validator definition', () => {
    const factory = (parameters: { minLength?: number; maxLength?: number }) =>
      Number.isFinite(parameters.minLength) && Number.isFinite(parameters.maxLength)
        ? (formGroup: FormGroup) =>
            formGroup.value
              ? Object.keys(formGroup.value).length < parameters.minLength || Object.keys(formGroup.value).length > parameters.maxLength
                ? { error: true }
                : null
              : null
        : undefined;
    const minMaxLength = {
      type: 'minMaxLength',
      parameters: {
        minLength: 3,
        maxLength: 5,
      },
      message: 'message',
    } as DynamicFormFieldValidatorDefinition;
    const validators = { minMaxLength } as Record<string, DynamicFormFieldValidatorDefinition>;
    const validation = { minMaxLength: true } as DynamicFormDictionaryValidation;
    const dictionary = { definition: { validators }, template: { validation } } as DynamicFormDictionary;

    const validator = new DynamicFormDictionaryValidator(factory, 'minMaxLength', dictionary);

    expect(validator.key).toBe('minMaxLength');
    expect(validator.field).toBe(dictionary);
    expect(validator.factory).toBe(factory);

    expect(validator.definition).toBe(minMaxLength);
    expect(validator.message).toBe('message');

    expect(validator.enabled).toBe(true);
    expect(validator.parameters).toBe(minMaxLength.parameters);
    expect(validator.validatorFn).toBeTruthy();
  });

  it('creating instance throws exception if definition not valid', () => {
    const factory = (minLength: number) =>
      Number.isFinite(minLength)
        ? (formGroup: FormGroup) => (formGroup.value && Object.keys(formGroup.value).length < minLength && { error: true }) || null
        : undefined;
    const dictionary = { template: { minLength: 3, validation: { minLength: true } } } as DynamicFormDictionary;

    expect(() => new DynamicFormDictionaryValidator(factory, 'minLength', dictionary)).toThrowError();
  });

  it('creating instance throws exception if validation not valid', () => {
    const factory = (minLength: number) =>
      Number.isFinite(minLength)
        ? (formGroup: FormGroup) => (formGroup.value && Object.keys(formGroup.value).length < minLength && { error: true }) || null
        : undefined;
    const dictionary = { definition: {}, template: { minLength: 3, validation: null } } as DynamicFormDictionary;

    expect(() => new DynamicFormDictionaryValidator(factory, 'minLength', dictionary)).toThrowError();
  });

  it('creating instance throws exception if factory not valid', () => {
    const dictionary = { definition: {}, template: { validation: { minLength: true } } } as DynamicFormDictionary;

    expect(() => new DynamicFormDictionaryValidator(null, 'minLength', dictionary)).toThrowError();
  });

  it('checkChanges returns false', () => {
    const factory = (minLength: number) =>
      Number.isFinite(minLength)
        ? (formGroup: FormGroup) => (formGroup.value && Object.keys(formGroup.value).length < minLength && { error: true }) || null
        : undefined;
    const dictionary = { definition: {}, template: { validation: { minLength: true } } } as DynamicFormDictionary;
    const validator = new DynamicFormDictionaryValidator(factory, 'minLength', dictionary);

    const changes = validator.checkChanges();

    expect(changes).toBe(false);
  });

  it('checkChanges updates validatorFn and returns true if enabled changes', () => {
    const factory = (minLength: number) =>
      Number.isFinite(minLength)
        ? (formGroup: FormGroup) => (formGroup.value && Object.keys(formGroup.value).length < minLength && { error: true }) || null
        : undefined;
    const dictionary = { definition: {}, template: { minLength: 3, validation: { minLength: true } } } as DynamicFormDictionary;
    const validator = new DynamicFormDictionaryValidator(factory, 'minLength', dictionary);

    expect(validator.enabled).toBe(true);
    expect(validator.validatorFn).toBeTruthy();

    dictionary.template.validation.minLength = false;
    const changes = validator.checkChanges();

    expect(changes).toBe(true);
    expect(validator.enabled).toBe(false);
    expect(validator.validatorFn).toBeUndefined();
  });

  it('checkChanges updates validatorFn and returns true if parameters changes', () => {
    const factory = (minLength: number) =>
      Number.isFinite(minLength)
        ? (formGroup: FormGroup) => (formGroup.value && Object.keys(formGroup.value).length < minLength && { error: true }) || null
        : undefined;
    const dictionary = { definition: {}, template: { minLength: 3, validation: { minLength: true } } } as DynamicFormDictionary;
    const validator = new DynamicFormDictionaryValidator(factory, 'minLength', dictionary);

    expect(validator.parameters).toBe(3);
    expect(validator.validatorFn).toBeTruthy();

    dictionary.template.minLength = null;
    const changes = validator.checkChanges();

    expect(changes).toBe(true);
    expect(validator.parameters).toBe(null);
    expect(validator.validatorFn).toBeUndefined();
  });
});

describe('DynamicFormDictionaryAsyncValidator', () => {
  it('creates instance', () => {
    const factory = _ => __ => of({ error: true });
    const validation = { uniqueItems: true } as DynamicFormDictionaryValidation;
    const dictionary = { definition: {}, template: { validation } } as DynamicFormDictionary;
    const validator = new DynamicFormDictionaryAsyncValidator(factory, 'uniqueItems', dictionary);

    expect(validator.async).toBeTrue();

    expect(validator.key).toBe('uniqueItems');
    expect(validator.field).toBe(dictionary);
    expect(validator.factory).toBe(factory);

    expect(validator.definition).toBeUndefined();
    expect(validator.message).toBeUndefined();

    expect(validator.enabled).toBe(true);
    expect(validator.parameters).toBeUndefined();
    expect(validator.validatorFn).toBeTruthy();
  });

  it('creates instance for validator definition', () => {
    const factory = _ => __ => of({ error: true });
    const uniqueItems = {
      type: 'uniqueItems',
      parameters: {
        properties: ['id', 'name'],
      },
      message: 'message',
    } as DynamicFormFieldValidatorDefinition;
    const validators = { uniqueItems } as Record<string, DynamicFormFieldValidatorDefinition>;
    const validation = { uniqueItems: true } as DynamicFormDictionaryValidation;
    const dictionary = { definition: { validators }, template: { validation } } as DynamicFormDictionary;
    const validator = new DynamicFormDictionaryAsyncValidator(factory, 'uniqueItems', dictionary);

    expect(validator.async).toBeTrue();

    expect(validator.key).toBe('uniqueItems');
    expect(validator.field).toBe(dictionary);
    expect(validator.factory).toBe(factory);

    expect(validator.definition).toBe(uniqueItems);
    expect(validator.message).toBe('message');

    expect(validator.enabled).toBe(true);
    expect(validator.parameters).toBe(uniqueItems.parameters);
    expect(validator.validatorFn).toBeTruthy();
  });
});
