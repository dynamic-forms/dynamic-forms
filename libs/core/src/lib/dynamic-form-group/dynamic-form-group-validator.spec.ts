import { FormGroup } from '@angular/forms';
import { DynamicFormFieldValidatorDefinition } from '../dynamic-form-field/dynamic-form-field-validator-definition';
import { DynamicFormGroup } from './dynamic-form-group';
import { DynamicFormGroupValidation } from './dynamic-form-group-validation';
import { DynamicFormGroupValidator } from './dynamic-form-group-validator';

describe('DynamicFormGroupValidator', () => {
  it('creates instance', () => {
    const group = { definition: {}, template: { validation: { required: true } } } as DynamicFormGroup;
    const factory = (_: any) => (formGroup: FormGroup) => formGroup.value ? null : { error: true };
    const validator = new DynamicFormGroupValidator('required', group, factory);

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
    const factory = (_: any) => (formGroup: FormGroup) => formGroup.value ? null : { error: true };
    const validator = new DynamicFormGroupValidator('equal', group, factory);

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
    const group = { template: { validation: { required: true } } } as DynamicFormGroup;
    const factory = (_: any) => (formGroup: FormGroup) => formGroup.value ? null : { error: true };

    expect(() => new DynamicFormGroupValidator('required', group, factory)).toThrowError();
  });

  it('creating instance throws exception if validation not valid', () => {
    const group = { definition: {}, template: { validation: null } } as DynamicFormGroup;
    const factory = (_: any) => (formGroup: FormGroup) => formGroup.value ? null : { error: true };

    expect(() => new DynamicFormGroupValidator('required', group, factory)).toThrowError();
  });

  it('creating instance throws exception if factory not valid', () => {
    const group = { template: { validation: { required: true } } } as DynamicFormGroup;

    expect(() => new DynamicFormGroupValidator('required', group, null)).toThrowError();
  });

  it('checkChanges returns false', () => {
    const group = { definition: {}, template: { validation: { required: true } } } as DynamicFormGroup;
    const factory = (_: any) => (formGroup: FormGroup) => formGroup.value ? null : { error: true };
    const validator = new DynamicFormGroupValidator('required', group, factory);

    const changes = validator.checkChanges();

    expect(changes).toBe(false);
  });

  it('checkChanges updates validatorFn and returns true if enabled changes', () => {
    const control = { definition: {}, template: { validation: { required: true } } } as DynamicFormGroup;
    const factory = (_: any) => (formGroup: FormGroup) => formGroup.value ? null : { error: true };
    const validator = new DynamicFormGroupValidator('required', control, factory);

    expect(validator.enabled).toBe(true);
    expect(validator.validatorFn).toBeTruthy();

    control.template.validation.required = false;
    const changes = validator.checkChanges();

    expect(changes).toBe(true);
    expect(validator.enabled).toBe(false);
    expect(validator.validatorFn).toBeUndefined();
  });
});
