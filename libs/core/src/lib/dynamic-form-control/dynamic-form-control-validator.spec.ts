import { Validators } from '@angular/forms';
import { DynamicFormControl } from './dynamic-form-control';
import { DynamicFormControlValidator } from './dynamic-form-control-validator';

describe('DynamicFormControlValidator', () => {
  it('new instance', () => {
    const control = <DynamicFormControl>{ template: { input: {}, validation: { required: true } } };
    const factory = _ => Validators.required;
    const validator = new DynamicFormControlValidator('required', control, factory);

    expect(validator.key).toBe('required');
    expect(validator.field).toBe(control);
    expect(validator.enabled).toBe(true);
    expect(validator.parameters).toBeUndefined();
    expect(validator.validatorFn).toBeDefined();
  });

  it('new instance throws exception if input not valid', () => {
    const control = <DynamicFormControl>{ template: { input: null, validation: { required: true } } };
    const factory = _ => Validators.required;

    expect(() => new DynamicFormControlValidator('required', control, factory)).toThrowError();
  });

  it('new instance throws exception if validation not valid', () => {
    const control = <DynamicFormControl>{ template: { input: {}, validation: null } };
    const factory = _ => Validators.required;

    expect(() => new DynamicFormControlValidator('required', control, factory)).toThrowError();
  });

  it('new instance throws exception if factory not valid', () => {
    const control = <DynamicFormControl>{ template: { input: {}, validation: { required: true } } };

    expect(() => new DynamicFormControlValidator('required', control, null)).toThrowError();
  });

  it('checkChanges returns false', () => {
    const control = <DynamicFormControl>{ template: { input: {}, validation: { required: true } } };
    const factory = _ => Validators.required;
    const validator = new DynamicFormControlValidator('required', control, factory);

    const changes = validator.checkChanges();

    expect(changes).toBe(false);
  });

  it('checkChanges updates validatorFn and returns true if enabled changes', () => {
    const control = <DynamicFormControl>{ template: { input: {}, validation: { required: true } } };
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
    const control = <DynamicFormControl>{ template: { input: { min: 0 }, validation: { min: true } } };
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
