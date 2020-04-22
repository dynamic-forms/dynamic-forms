import { FormGroup } from '@angular/forms';
import { DynamicFormGroup } from './dynamic-form-group';
import { DynamicFormGroupValidator } from './dynamic-form-group-validator';

describe('DynamicFormGroupValidator', () => {
  it('new instance', () => {
    const group = <DynamicFormGroup>{ template: { validation: { required: true } } };
    const factory = (_: any) => (formGroup: FormGroup) => formGroup.value ? null : { error: true };
    const validator = new DynamicFormGroupValidator('required', group, factory);

    expect(validator.key).toBe('required');
    expect(validator.field).toBe(group);
    expect(validator.factory).toBe(factory);

    expect(validator.enabled).toBe(true);
    expect(validator.parameters).toBeUndefined();
    expect(validator.validatorFn).toBeDefined();
  });

  it('new instance throws exception if validation not valid', () => {
    const group = <DynamicFormGroup>{ template: { validation: null } };
    const factory = (_: any) => (formGroup: FormGroup) => formGroup.value ? null : { error: true };

    expect(() => new DynamicFormGroupValidator('required', group, factory)).toThrowError();
  });

  it('new instance throws exception if factory not valid', () => {
    const group = <DynamicFormGroup>{ template: { validation: { required: true } } };

    expect(() => new DynamicFormGroupValidator('required', group, null)).toThrowError();
  });

  it('checkChanges returns false', () => {
    const group = <DynamicFormGroup>{ template: { validation: { required: true } } };
    const factory = (_: any) => (formGroup: FormGroup) => formGroup.value ? null : { error: true };
    const validator = new DynamicFormGroupValidator('required', group, factory);

    const changes = validator.checkChanges();

    expect(changes).toBe(false);
  });

  it('checkChanges updates validatorFn and returns true if enabled changes', () => {
    const control = <DynamicFormGroup>{ template: { validation: { required: true } } };
    const factory = (_: any) => (formGroup: FormGroup) => formGroup.value ? null : { error: true };
    const validator = new DynamicFormGroupValidator('required', control, factory);

    expect(validator.enabled).toBe(true);
    expect(validator.validatorFn).toBeDefined();

    control.template.validation.required = false;
    const changes = validator.checkChanges();

    expect(changes).toBe(true);
    expect(validator.enabled).toBe(false);
    expect(validator.validatorFn).toBeUndefined();
  });
});
