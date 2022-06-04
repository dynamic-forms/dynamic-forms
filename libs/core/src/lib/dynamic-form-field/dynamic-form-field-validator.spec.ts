import { of } from 'rxjs';
import { DynamicFormField } from './dynamic-form-field';
import { DynamicFormFieldValidation } from './dynamic-form-field-validation';
import {
  DynamicFormFieldAsyncValidator, DynamicFormFieldAsyncValidatorFactory,
  DynamicFormFieldValidator, DynamicFormFieldValidatorBase, DynamicFormFieldValidatorFactory,
} from './dynamic-form-field-validator';
import { DynamicFormFieldValidatorDefinition } from './dynamic-form-field-validator-definition';

class TestDynamicFormFieldValidatorBase extends DynamicFormFieldValidatorBase {
  constructor(factory: DynamicFormFieldValidatorFactory | DynamicFormFieldAsyncValidatorFactory, key: string, field: DynamicFormField) {
    super(factory, key, field);
  }

  get async(): boolean { return undefined; }

  getParameters(): any { return this.field.template.hidden; }
}

describe('DynamicFormFieldValidatorBase', () => {
  it('creates instance', () => {
    const factory = _ => __ => null;
    const validation = { valid: true } as DynamicFormFieldValidation;
    const field = { definition: {}, template: { validation } } as DynamicFormField;
    const validator = new TestDynamicFormFieldValidatorBase(factory, 'valid', field);

    expect(validator.key).toBe('valid');
    expect(validator.field).toBe(field);
    expect(validator.factory).toBe(factory);

    expect(validator.enabled).toBe(true);
    expect(validator.parameters).toBeUndefined();
    expect(validator.validatorFn).toBeTruthy();
  });

  it('creates instance for validator definition', () => {
    const factory = _ => __ => null;
    const valid = {
      type: 'valid',
      message: 'message',
    } as DynamicFormFieldValidatorDefinition;
    const validators = { valid } as { [key: string]: DynamicFormFieldValidatorDefinition };
    const validation = { valid: true } as DynamicFormFieldValidation;
    const field = { definition: { validators }, template: { validation } } as DynamicFormField;
    const validator = new TestDynamicFormFieldValidatorBase(factory, 'valid', field);

    expect(validator.key).toBe('valid');
    expect(validator.field).toBe(field);
    expect(validator.factory).toBe(factory);

    expect(validator.definition).toBe(valid);
    expect(validator.message).toBe('message');

    expect(validator.enabled).toBe(true);
    expect(validator.parameters).toBeUndefined();
    expect(validator.validatorFn).toBeTruthy();
  });

  it('creating instance throws exception if definition not valid', () => {
    const validation = { valid: true } as DynamicFormFieldValidation;
    const field = { template: { validation } } as DynamicFormField;

    expect(() => new TestDynamicFormFieldValidatorBase(_ => __ => null, 'valid', field)).toThrowError();
  });

  it('creating instance throws exception if validation not valid', () => {
    const factory = _ => __ => null;
    const field = { definition: {}, template: { validation: null } } as DynamicFormField;

    expect(() => new TestDynamicFormFieldValidatorBase(factory, 'valid', field)).toThrowError();
  });

  it('creating instance throws exception if factory not valid', () => {
    const validation = { valid: true } as DynamicFormFieldValidation;
    const field = { definition: {}, template: { validation } } as DynamicFormField;

    expect(() => new TestDynamicFormFieldValidatorBase(null, 'valid', field)).toThrowError();
  });

  it('checkChanges returns false', () => {
    const validation = { valid: true } as DynamicFormFieldValidation;
    const field = { definition: {}, template: { validation } } as DynamicFormField;
    const validator = new TestDynamicFormFieldValidatorBase(_ => __ => null, 'valid', field);

    const changes = validator.checkChanges();

    expect(changes).toBe(false);
  });

  it('checkChanges updates validatorFn and returns true if enabled changes', () => {
    const validation = { valid: true } as DynamicFormFieldValidation;
    const field = { definition: {}, template: { validation } } as DynamicFormField;
    const validator = new TestDynamicFormFieldValidatorBase(_ => __ => null, 'valid', field);

    expect(validator.enabled).toBe(true);
    expect(validator.validatorFn).toBeTruthy();

    field.template.validation.valid = false;
    const changes = validator.checkChanges();

    expect(changes).toBe(true);
    expect(validator.enabled).toBe(false);
    expect(validator.validatorFn).toBeUndefined();
  });

  it('checkChanges updates validatorFn and returns true if parameters changes', () => {
    const factory = (hidden: boolean) => hidden ? undefined :  _ => null;
    const validation = { valid: true } as DynamicFormFieldValidation;
    const field = { definition: {}, template: { validation } } as DynamicFormField;
    const validator = new TestDynamicFormFieldValidatorBase(factory,'valid', field );

    expect(validator.parameters).toBeUndefined();
    expect(validator.validatorFn).toBeTruthy();

    field.template.hidden = true;
    const changes = validator.checkChanges();

    expect(changes).toBe(true);
    expect(validator.parameters).toBe(true);
    expect(validator.validatorFn).toBeUndefined();
  });
});

class TestDynamicFormFieldValidator extends DynamicFormFieldValidator {
  constructor(factory: DynamicFormFieldValidatorFactory, key: string, field: DynamicFormField) {
    super(factory, key, field);
  }

  getParameters(): any { return this.field.template; }
}

describe('DynamicFormFieldValidator', () => {
  it('creates instance', () => {
    const factory = _ => __ => null;
    const validation = { valid: true } as DynamicFormFieldValidation;
    const field = { definition: {}, template: { validation } } as DynamicFormField;
    const validator = new TestDynamicFormFieldValidator(factory, 'valid', field);

    expect(validator.async).toBeFalse();

    expect(validator.key).toBe('valid');
    expect(validator.field).toBe(field);
    expect(validator.factory).toBe(factory);

    expect(validator.enabled).toBe(true);
    expect(validator.parameters).toBe(field.template);
    expect(validator.validatorFn).toBeTruthy();
  });
});

class TestDynamicFormFieldAsyncValidator extends DynamicFormFieldAsyncValidator {
  constructor(factory: DynamicFormFieldAsyncValidatorFactory, key: string, field: DynamicFormField) {
    super(factory, key, field);
  }

  getParameters(): any { return this.field.template; }
}

describe('DynamicFormFieldAsyncValidator', () => {
  it('creates instance', () => {
    const factory = _ => __ => of(null);
    const validation = { valid: true } as DynamicFormFieldValidation;
    const field = { definition: {}, template: { validation } } as DynamicFormField;
    const validator = new TestDynamicFormFieldAsyncValidator(factory, 'valid', field);

    expect(validator.async).toBeTrue();

    expect(validator.key).toBe('valid');
    expect(validator.field).toBe(field);
    expect(validator.factory).toBe(factory);

    expect(validator.enabled).toBe(true);
    expect(validator.parameters).toBe(field.template);
    expect(validator.validatorFn).toBeTruthy();
  });
});
