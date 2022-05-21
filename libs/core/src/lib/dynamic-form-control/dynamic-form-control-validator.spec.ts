import { UntypedFormControl, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { DynamicFormFieldValidatorDefinition } from '../dynamic-form-field/dynamic-form-field-validator-definition';
import { DynamicFormControl } from './dynamic-form-control';
import { DynamicFormControlValidation } from './dynamic-form-control-validation';
import { DynamicFormControlAsyncValidator, DynamicFormControlValidator } from './dynamic-form-control-validator';

describe('DynamicFormControlValidator', () => {
  it('creates instance', () => {
    const control = { definition: {}, template: { input: {}, validation: { required: true } } } as DynamicFormControl;
    const factory = _ => Validators.required;
    const validator = new DynamicFormControlValidator(factory, 'required', control);

    expect(validator.async).toBeFalse();

    expect(validator.key).toBe('required');
    expect(validator.field).toBe(control);
    expect(validator.factory).toBe(factory);

    expect(validator.definition).toBeUndefined();
    expect(validator.message).toBeUndefined();

    expect(validator.enabled).toBe(true);
    expect(validator.parameters).toBeUndefined();
    expect(validator.validatorFn).toBeTruthy();
  });

  it('creates instance for validator definition', () => {
    const factory = (parameters: { minLength?: number; maxLength?: number }) =>
    Number.isFinite(parameters.minLength) && Number.isFinite(parameters.maxLength)
      ? (formControl: UntypedFormControl) => formControl.value
          ? formControl.value.length < parameters.minLength || formControl.value.length > parameters.maxLength
            ? { error: true }
            : null
          : null
      : undefined;
    const minMaxLength = {
      type: 'minMaxLength',
      parameters: {
        minLength: 3,
        maxLength: 5
      },
      message: 'message'
    } as DynamicFormFieldValidatorDefinition;
    const validators = { minMaxLength } as { [key: string]: DynamicFormFieldValidatorDefinition };
    const validation = { minMaxLength: true } as DynamicFormControlValidation;
    const control = { definition: { validators }, template: { input: {}, validation } } as DynamicFormControl;
    const validator = new DynamicFormControlValidator(factory, 'minMaxLength', control);

    expect(validator.key).toBe('minMaxLength');
    expect(validator.field).toBe(control);
    expect(validator.factory).toBe(factory);

    expect(validator.definition).toBe(minMaxLength);
    expect(validator.message).toBe('message');

    expect(validator.enabled).toBe(true);
    expect(validator.parameters).toBe(minMaxLength.parameters);
    expect(validator.validatorFn).toBeTruthy();
  });

  it('creating instance throws exception if definition not valid', () => {
    const factory = _ => Validators.required;
    const control = { template: { input: {}, validation: { required: true } } } as DynamicFormControl;

    expect(() => new DynamicFormControlValidator(factory, 'required', control)).toThrowError();
  });

  it('creating instance throws exception if input not valid', () => {
    const factory = _ => Validators.required;
    const control = { definition: {}, template: { input: null, validation: { required: true } } } as DynamicFormControl;

    expect(() => new DynamicFormControlValidator(factory, 'required', control)).toThrowError();
  });

  it('creating instance throws exception if validation not valid', () => {
    const factory = _ => Validators.required;
    const control = { definition: {}, template: { input: {}, validation: null } } as DynamicFormControl;

    expect(() => new DynamicFormControlValidator(factory, 'required', control)).toThrowError();
  });

  it('creating instance throws exception if factory not valid', () => {
    const control = { definition: {}, template: { input: {}, validation: { required: true } } } as DynamicFormControl;

    expect(() => new DynamicFormControlValidator(null, 'required', control)).toThrowError();
  });

  it('checkChanges returns false', () => {
    const factory = _ => Validators.required;
    const control = { definition: {}, template: { input: {}, validation: { required: true } } } as DynamicFormControl;
    const validator = new DynamicFormControlValidator(factory, 'required', control);

    const changes = validator.checkChanges();

    expect(changes).toBe(false);
  });

  it('checkChanges updates validatorFn and returns true if enabled changes', () => {
    const factory = _ => Validators.required;
    const control = { definition: {}, template: { input: {}, validation: { required: true } } } as DynamicFormControl;
    const validator = new DynamicFormControlValidator(factory, 'required', control);

    expect(validator.enabled).toBe(true);
    expect(validator.validatorFn).toBeTruthy();

    control.template.validation.required = false;
    const changes = validator.checkChanges();

    expect(changes).toBe(true);
    expect(validator.enabled).toBe(false);
    expect(validator.validatorFn).toBeUndefined();
  });

  it('checkChanges updates validatorFn and returns true if parameters changes', () => {
    const factory = (min: number) => Number.isFinite(min) ? Validators.min(min) : undefined;
    const control = { definition: {}, template: { input: { min: 0 }, validation: { min: true } } } as DynamicFormControl;
    const validator = new DynamicFormControlValidator(factory, 'min', control);

    expect(validator.parameters).toBe(0);
    expect(validator.validatorFn).toBeTruthy();

    control.template.input.min = null;
    const changes = validator.checkChanges();

    expect(changes).toBe(true);
    expect(validator.parameters).toBe(null);
    expect(validator.validatorFn).toBeUndefined();
  });
});

describe('DynamicFormControlAsyncValidator', () => {
  it('creates instance', () => {
    const factory = __ => _ => of({ error: true });
    const validation = { unique: true } as DynamicFormControlValidation;
    const control = { definition: {}, template: { input: {}, validation } } as DynamicFormControl;
    const validator = new DynamicFormControlAsyncValidator(factory, 'unique', control);

    expect(validator.async).toBeTrue();

    expect(validator.key).toBe('unique');
    expect(validator.field).toBe(control);
    expect(validator.factory).toBe(factory);

    expect(validator.enabled).toBe(true);
    expect(validator.parameters).toBeUndefined();
    expect(validator.validatorFn).toBeTruthy();
  });

  it('creates instance for validator defintion', () => {
    const factory = __ => _ => of({ error: true });
    const unique = {
      type: 'unique',
      parameters: {
        properties: [ 'id', 'name']
      },
      message: 'message'
    } as DynamicFormFieldValidatorDefinition;
    const validators = { unique } as { [key: string]: DynamicFormFieldValidatorDefinition };
    const validation = { unique: true } as DynamicFormControlValidation;
    const control = { definition: { validators }, template: { input: {}, validation } } as DynamicFormControl;
    const validator = new DynamicFormControlAsyncValidator(factory, 'unique', control);

    expect(validator.async).toBeTrue();

    expect(validator.key).toBe('unique');
    expect(validator.field).toBe(control);
    expect(validator.factory).toBe(factory);

    expect(validator.definition).toBe(unique);
    expect(validator.message).toBe('message');

    expect(validator.enabled).toBe(true);
    expect(validator.parameters).toBe(unique.parameters);
    expect(validator.validatorFn).toBeTruthy();
  });
});
