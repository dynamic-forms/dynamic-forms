import { UntypedFormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { DynamicFormFieldValidatorDefinition } from '../dynamic-form-field/dynamic-form-field-validator-definition';
import { DynamicFormGroup } from './dynamic-form-group';
import { DynamicFormGroupValidation } from './dynamic-form-group-validation';
import { DynamicFormGroupAsyncValidator, DynamicFormGroupValidator } from './dynamic-form-group-validator';

describe('DynamicFormGroupValidator', () => {
  it('creates instance', () => {
    const factory = (_: any) => (formGroup: UntypedFormGroup) => formGroup.value ? null : { error: true };
    const group = { definition: {}, template: { validation: { required: true } } } as DynamicFormGroup;
    const validator = new DynamicFormGroupValidator(factory, 'required', group);

    expect(validator.async).toBeFalse();

    expect(validator.key).toBe('required');
    expect(validator.field).toBe(group);
    expect(validator.factory).toBe(factory);

    expect(validator.definition).toBeUndefined();
    expect(validator.message).toBeUndefined();

    expect(validator.enabled).toBe(true);
    expect(validator.parameters).toBeUndefined();
    expect(validator.validatorFn).toBeTruthy();
  });

  it('creates instance for validator definition', () => {
    const factory = (_: any) => (formGroup: UntypedFormGroup) => formGroup.value ? null : { error: true };
    const equal = {
      type: 'equal',
      parameters: {
        keys: []
      },
      message: 'message'
    } as DynamicFormFieldValidatorDefinition;
    const validators = { equal } as { [key: string]: DynamicFormFieldValidatorDefinition };
    const validation = { equal: true } as DynamicFormGroupValidation;
    const group = { definition: { validators }, template: { validation } } as DynamicFormGroup;
    const validator = new DynamicFormGroupValidator(factory, 'equal', group);

    expect(validator.key).toBe('equal');
    expect(validator.field).toBe(group);
    expect(validator.factory).toBe(factory);

    expect(validator.definition).toBe(equal);
    expect(validator.message).toBe('message');

    expect(validator.enabled).toBe(true);
    expect(validator.parameters).toBe(equal.parameters);
    expect(validator.validatorFn).toBeTruthy();
  });

  it('creating instance throws exception if definition not valid', () => {
    const factory = (_: any) => (formGroup: UntypedFormGroup) => formGroup.value ? null : { error: true };
    const group = { template: { validation: { required: true } } } as DynamicFormGroup;

    expect(() => new DynamicFormGroupValidator(factory, 'required', group)).toThrowError();
  });

  it('creating instance throws exception if validation not valid', () => {
    const factory = (_: any) => (formGroup: UntypedFormGroup) => formGroup.value ? null : { error: true };
    const group = { definition: {}, template: { validation: null } } as DynamicFormGroup;

    expect(() => new DynamicFormGroupValidator(factory, 'required', group)).toThrowError();
  });

  it('creating instance throws exception if factory not valid', () => {
    const group = { template: { validation: { required: true } } } as DynamicFormGroup;

    expect(() => new DynamicFormGroupValidator(null, 'required', group)).toThrowError();
  });

  it('checkChanges returns false', () => {
    const factory = (_: any) => (formGroup: UntypedFormGroup) => formGroup.value ? null : { error: true };
    const group = { definition: {}, template: { validation: { required: true } } } as DynamicFormGroup;
    const validator = new DynamicFormGroupValidator(factory, 'required', group);

    const changes = validator.checkChanges();

    expect(changes).toBe(false);
  });

  it('checkChanges updates validatorFn and returns true if enabled changes', () => {
    const factory = (_: any) => (formGroup: UntypedFormGroup) => formGroup.value ? null : { error: true };
    const group = { definition: {}, template: { validation: { required: true } } } as DynamicFormGroup;
    const validator = new DynamicFormGroupValidator(factory, 'required', group);

    expect(validator.enabled).toBe(true);
    expect(validator.validatorFn).toBeTruthy();

    group.template.validation.required = false;
    const changes = validator.checkChanges();

    expect(changes).toBe(true);
    expect(validator.enabled).toBe(false);
    expect(validator.validatorFn).toBeUndefined();
  });
});

describe('DynamicFormGroupAsyncValidator', () => {
  it('creates instance', () => {
    const factory = _ => __ => of({ error: true });
    const validation = { uniqueItems: true } as DynamicFormGroupValidation;
    const group = { definition: {}, template: { validation } } as DynamicFormGroup;
    const validator = new DynamicFormGroupAsyncValidator(factory, 'uniqueItems', group);

    expect(validator.async).toBeTrue();

    expect(validator.key).toBe('uniqueItems');
    expect(validator.field).toBe(group);
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
        properties: [ 'id', 'name']
      },
      message: 'message'
    } as DynamicFormFieldValidatorDefinition;
    const validators = { uniqueItems } as { [key: string]: DynamicFormFieldValidatorDefinition };
    const validation = { uniqueItems: true } as DynamicFormGroupValidation;
    const group = { definition: { validators }, template: { validation } } as DynamicFormGroup;
    const validator = new DynamicFormGroupAsyncValidator(factory, 'uniqueItems', group);

    expect(validator.async).toBeTrue();

    expect(validator.key).toBe('uniqueItems');
    expect(validator.field).toBe(group);
    expect(validator.factory).toBe(factory);

    expect(validator.definition).toBe(uniqueItems);
    expect(validator.message).toBe('message');

    expect(validator.enabled).toBe(true);
    expect(validator.parameters).toBe(uniqueItems.parameters);
    expect(validator.validatorFn).toBeTruthy();
  });
});
