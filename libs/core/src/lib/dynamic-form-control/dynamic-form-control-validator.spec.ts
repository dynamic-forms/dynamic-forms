import { Validators } from '@angular/forms';
import { DynamicFormControlTemplate } from './dynamic-form-control-template';
import { DynamicFormControlValidator } from './dynamic-form-control-validator';

describe('DynamicFormControlValidator', () => {
  it('new instance', () => {
    const template = <DynamicFormControlTemplate>{ input: {}, validation: { required: true } };
    const factory = _ => Validators.required;
    const validator = new DynamicFormControlValidator('required', template, factory);

    expect(validator.key).toBe('required');
    expect(validator.template).toBe(template);
    expect(validator.enabled).toBe(true);
    expect(validator.parameters).toBeUndefined();
    expect(validator.validatorFn).toBeDefined();
  });

  it('new instance throws exception if input not valid', () => {
    const template = <DynamicFormControlTemplate>{ input: null, validation: { required: true } };
    const factory = _ => Validators.required;

    expect(() => new DynamicFormControlValidator('required', template, factory)).toThrowError();
  });

  it('new instance throws exception if validation not valid', () => {
    const template = <DynamicFormControlTemplate>{ input: {}, validation: null };
    const factory = _ => Validators.required;

    expect(() => new DynamicFormControlValidator('required', template, factory)).toThrowError();
  });

  it('new instance throws exception if factory not valid', () => {
    const template = <DynamicFormControlTemplate>{ input: {}, validation: { required: true } };

    expect(() => new DynamicFormControlValidator('required', template, null)).toThrowError();
  });

  it('checkChanges returns false', () => {
    const template = <DynamicFormControlTemplate>{ input: {}, validation: { required: true } };
    const factory = _ => Validators.required;
    const validator = new DynamicFormControlValidator('required', template, factory);

    const changes = validator.checkChanges();

    expect(changes).toBe(false);
  });

  it('checkChanges updates validatorFn and returns true if enabled changes', () => {
    const template = <DynamicFormControlTemplate>{ input: {}, validation: { required: true } };
    const factory = _ => Validators.required;
    const validator = new DynamicFormControlValidator('required', template, factory);

    expect(validator.enabled).toBe(true);
    expect(validator.validatorFn).toBeDefined();

    template.validation.required = false;
    const changes = validator.checkChanges();

    expect(changes).toBe(true);
    expect(validator.enabled).toBe(false);
    expect(validator.validatorFn).toBeUndefined();
  });

  it('checkChanges updates validatorFn and returns true if parameters changes', () => {
    const template = <DynamicFormControlTemplate>{ input: { min: 0 }, validation: { min: true } };
    const factory = (min: number) => Number.isFinite(min) ? Validators.min(min) : undefined;
    const validator = new DynamicFormControlValidator('min', template, factory);

    expect(validator.parameters).toBe(0);
    expect(validator.validatorFn).toBeDefined();

    template.input.min = null;
    const changes = validator.checkChanges();

    expect(changes).toBe(true);
    expect(validator.parameters).toBe(null);
    expect(validator.validatorFn).toBeUndefined();
  });
});
