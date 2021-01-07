import { FormControl, Validators } from '@angular/forms';
import { DynamicFormFieldValidatorDefinition } from '../dynamic-form-field/dynamic-form-field-validator-definition';
import { DynamicFormControl } from './dynamic-form-control';
import { DynamicFormControlValidation } from './dynamic-form-control-validation';
import { DynamicFormControlValidator } from './dynamic-form-control-validator';

describe('DynamicFormControlValidator', () => {
  it('creates instance', () => {
    const control = <DynamicFormControl>{ definition: {}, template: { input: {}, validation: { required: true } } };
    const factory = _ => Validators.required;
    const validator = new DynamicFormControlValidator('required', control, factory);

    expect(validator.key).toBe('required');
    expect(validator.field).toBe(control);
    expect(validator.factory).toBe(factory);

    expect(validator.enabled).toBe(true);
    expect(validator.parameters).toBeUndefined();
    expect(validator.validatorFn).toBeDefined();
  });

  it('creates instance for validator definition', () => {
    const minMaxLength = <DynamicFormFieldValidatorDefinition> {
      type: 'minMaxLength',
      parameters: {
        minLength: 3,
        maxLength: 5
      },
      message: 'message'
    };
    const validators = <{ [key: string]: DynamicFormFieldValidatorDefinition }>{ minMaxLength };
    const validation = <DynamicFormControlValidation>{ minMaxLength: true };
    const control = <DynamicFormControl>{ definition: { validators }, template: { input: {}, validation } };
    const factory = (parameters: { minLength?: number, maxLength?: number }) => {
      return Number.isFinite(parameters.minLength) && Number.isFinite(parameters.maxLength)
        ? (formControl: FormControl) => formControl.value
            ? formControl.value.length < parameters.minLength || formControl.value.length > parameters.maxLength
              ? { error: true }
              : null
            : null
        : undefined;
    };
    const validator = new DynamicFormControlValidator('minMaxLength', control, factory);

    expect(validator.key).toBe('minMaxLength');
    expect(validator.field).toBe(control);
    expect(validator.factory).toBe(factory);

    expect(validator.definition).toBe(minMaxLength);
    expect(validator.message).toBe('message');

    expect(validator.enabled).toBe(true);
    expect(validator.parameters).toBe(minMaxLength.parameters);
    expect(validator.validatorFn).toBeDefined();
  });

  it('creating instance throws exception if definition not valid', () => {
    const control = <DynamicFormControl>{ template: { input: {}, validation: { required: true } } };
    const factory = _ => Validators.required;

    expect(() => new DynamicFormControlValidator('required', control, factory)).toThrowError();
  });

  it('creating instance throws exception if input not valid', () => {
    const control = <DynamicFormControl>{ definition: {}, template: { input: null, validation: { required: true } } };
    const factory = _ => Validators.required;

    expect(() => new DynamicFormControlValidator('required', control, factory)).toThrowError();
  });

  it('creating instance throws exception if validation not valid', () => {
    const control = <DynamicFormControl>{ definition: {}, template: { input: {}, validation: null } };
    const factory = _ => Validators.required;

    expect(() => new DynamicFormControlValidator('required', control, factory)).toThrowError();
  });

  it('creating instance throws exception if factory not valid', () => {
    const control = <DynamicFormControl>{ definition: {}, template: { input: {}, validation: { required: true } } };

    expect(() => new DynamicFormControlValidator('required', control, null)).toThrowError();
  });

  it('checkChanges returns false', () => {
    const control = <DynamicFormControl>{ definition: {}, template: { input: {}, validation: { required: true } } };
    const factory = _ => Validators.required;
    const validator = new DynamicFormControlValidator('required', control, factory);

    const changes = validator.checkChanges();

    expect(changes).toBe(false);
  });

  it('checkChanges updates validatorFn and returns true if enabled changes', () => {
    const control = <DynamicFormControl>{ definition: {}, template: { input: {}, validation: { required: true } } };
    const factory = _ => Validators.required;
    const validator = new DynamicFormControlValidator('required', control, factory);

    expect(validator.enabled).toBe(true);
    expect(validator.validatorFn).toBeDefined();

    control.template.validation.required = false;
    const changes = validator.checkChanges();

    expect(changes).toBe(true);
    expect(validator.enabled).toBe(false);
    expect(validator.validatorFn).toBeUndefined();
  });

  it('checkChanges updates validatorFn and returns true if parameters changes', () => {
    const control = <DynamicFormControl>{ definition: {}, template: { input: { min: 0 }, validation: { min: true } } };
    const factory = (min: number) => Number.isFinite(min) ? Validators.min(min) : undefined;
    const validator = new DynamicFormControlValidator('min', control, factory);

    expect(validator.parameters).toBe(0);
    expect(validator.validatorFn).toBeDefined();

    control.template.input.min = null;
    const changes = validator.checkChanges();

    expect(changes).toBe(true);
    expect(validator.parameters).toBe(null);
    expect(validator.validatorFn).toBeUndefined();
  });
});
