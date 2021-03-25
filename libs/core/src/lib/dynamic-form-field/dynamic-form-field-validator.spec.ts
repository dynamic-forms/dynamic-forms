import { DynamicFormField } from './dynamic-form-field';
import { DynamicFormFieldValidation } from './dynamic-form-field-validation';
import { DynamicFormFieldValidator, DynamicFormFieldValidatorFactory } from './dynamic-form-field-validator';
import { DynamicFormFieldValidatorDefinition } from './dynamic-form-field-validator-definition';

class TestDynamicFormFieldValidator extends DynamicFormFieldValidator {
  constructor(key: string, field: DynamicFormField, factory: DynamicFormFieldValidatorFactory) {
    super(key, field, factory);
  }

  getParameters(): any { return this.field.template.hidden; }
}

describe('DynamicFormFieldValidator', () => {
  it('creates instance', () => {
    const validation = { valid: true } as DynamicFormFieldValidation;
    const field = { definition: {}, template: { validation } } as DynamicFormField;
    const factory = _ => __ => null;
    const validator = new TestDynamicFormFieldValidator('valid', field, factory);

    expect(validator.key).toBe('valid');
    expect(validator.field).toBe(field);
    expect(validator.factory).toBe(factory);

    expect(validator.enabled).toBe(true);
    expect(validator.parameters).toBeUndefined();
    expect(validator.validatorFn).toBeTruthy();
  });

  it('creates instance for validator definition', () => {
    const valid = {
      type: 'valid',
      message: 'message'
    } as DynamicFormFieldValidatorDefinition;
    const validators = { valid } as { [key: string]: DynamicFormFieldValidatorDefinition };
    const validation = { valid: true } as DynamicFormFieldValidation;
    const field = { definition: { validators }, template: { validation } } as DynamicFormField;
    const factory = _ => __ => null;
    const validator = new TestDynamicFormFieldValidator('valid', field, factory);

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

    expect(() => new TestDynamicFormFieldValidator('valid', field, _ => __ => null)).toThrowError();
  });

  it('creating instance throws exception if validation not valid', () => {
    const field = { definition: {}, template: { validation: null } } as DynamicFormField;
    const factory = _ => __ => null;

    expect(() => new TestDynamicFormFieldValidator('valid', field, factory)).toThrowError();
  });

  it('creating instance throws exception if factory not valid', () => {
    const validation = { valid: true } as DynamicFormFieldValidation;
    const field = { definition: {}, template: { validation } } as DynamicFormField;

    expect(() => new TestDynamicFormFieldValidator('valid', field, null)).toThrowError();
  });

  it('checkChanges returns false', () => {
    const validation = { valid: true } as DynamicFormFieldValidation;
    const field = { definition: {}, template: { validation } } as DynamicFormField;
    const validator = new TestDynamicFormFieldValidator('valid', field, _ => __ => null);

    const changes = validator.checkChanges();

    expect(changes).toBe(false);
  });

  it('checkChanges updates validatorFn and returns true if enabled changes', () => {
    const validation = { valid: true } as DynamicFormFieldValidation;
    const field = { definition: {}, template: { validation } } as DynamicFormField;
    const validator = new TestDynamicFormFieldValidator('valid', field, _ => __ => null);

    expect(validator.enabled).toBe(true);
    expect(validator.validatorFn).toBeTruthy();

    field.template.validation.valid = false;
    const changes = validator.checkChanges();

    expect(changes).toBe(true);
    expect(validator.enabled).toBe(false);
    expect(validator.validatorFn).toBeUndefined();
  });

  it('checkChanges updates validatorFn and returns true if parameters changes', () => {
    const validation = { valid: true } as DynamicFormFieldValidation;
    const field = { definition: {}, template: { validation } } as DynamicFormField;
    const factory = (hidden: boolean) => hidden ? undefined :  _ => null;
    const validator = new TestDynamicFormFieldValidator('valid', field, factory);

    expect(validator.parameters).toBeUndefined();
    expect(validator.validatorFn).toBeTruthy();

    field.template.hidden = true;
    const changes = validator.checkChanges();

    expect(changes).toBe(true);
    expect(validator.parameters).toBe(true);
    expect(validator.validatorFn).toBeUndefined();
  });
});
