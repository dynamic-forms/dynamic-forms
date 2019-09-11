import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormControlTemplate } from '../dynamic-form-control/dynamic-form-control-template';
import { DynamicFormValidationBuilder } from './dynamic-form-validation.builder';

describe('DynamicFormValidationBuilder', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        DynamicFormValidationBuilder
      ]
    });
  }));

  it('returns control validator for required',
    inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
      const template = <DynamicFormControlTemplate>{ input: {}, validation: { required: true } };
      const validator = service.createControlValidator(template, 'required');

      expect(validator.key).toBe('required');
      expect(validator.factory).toBeDefined();
      expect(validator.enabled).toBe(true);
      expect(validator.parameters).toBeUndefined();
      expect(validator.validatorFn).toBeDefined();
    })
  );

  it('returns control validator for email',
    inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
      const template = <DynamicFormControlTemplate>{ input: {}, validation: { email: true } };
      const validator = service.createControlValidator(template, 'email');

      expect(validator.key).toBe('email');
      expect(validator.factory).toBeDefined();
      expect(validator.enabled).toBe(true);
      expect(validator.parameters).toBeUndefined();
      expect(validator.validatorFn).toBeDefined();
    })
  );

  it('returns control validator for pattern',
    inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
      const template = <DynamicFormControlTemplate>{ input: { pattern: '[A-Za-z]*' }, validation: { pattern: true } };
      const validator = service.createControlValidator(template, 'pattern');

      expect(validator.key).toBe('pattern');
      expect(validator.factory).toBeDefined();
      expect(validator.enabled).toBe(true);
      expect(validator.parameters).toBe('[A-Za-z]*');
      expect(validator.validatorFn).toBeDefined();
    })
  );

  it('returns control validator for pattern with validatorFn being undefined',
    inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
      const template = <DynamicFormControlTemplate>{ input: { pattern: null }, validation: { pattern: true } };
      const validator = service.createControlValidator(template, 'pattern');

      expect(validator.key).toBe('pattern');
      expect(validator.factory).toBeDefined();
      expect(validator.enabled).toBe(true);
      expect(validator.parameters).toBeNull();
      expect(validator.validatorFn).toBeUndefined();
    })
  );

  it('returns control validator for min',
    inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
      const template = <DynamicFormControlTemplate>{ input: { min: -10 }, validation: { min: true } };
      const validator = service.createControlValidator(template, 'min');

      expect(validator.key).toBe('min');
      expect(validator.factory).toBeDefined();
      expect(validator.enabled).toBe(true);
      expect(validator.parameters).toBe(-10);
      expect(validator.validatorFn).toBeDefined();
    })
  );

  it('returns control validator for min with validatorFn being undefined',
    inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
      const template = <DynamicFormControlTemplate>{ input: {}, validation: { min: true } };
      const validator = service.createControlValidator(template, 'min');

      expect(validator.key).toBe('min');
      expect(validator.factory).toBeDefined();
      expect(validator.enabled).toBe(true);
      expect(validator.parameters).toBeUndefined();
      expect(validator.validatorFn).toBeUndefined();
    })
  );

  it('returns control validator for max',
    inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
      const template = <DynamicFormControlTemplate>{ input: { max: 10 }, validation: { max: true } };
      const validator = service.createControlValidator(template, 'max');

      expect(validator.key).toBe('max');
      expect(validator.factory).toBeDefined();
      expect(validator.enabled).toBe(true);
      expect(validator.parameters).toBe(10);
      expect(validator.validatorFn).toBeDefined();
    })
  );

  it('returns control validator for max with validatorFn being undefined',
    inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
      const template = <DynamicFormControlTemplate>{ input: {}, validation: { max: true } };
      const validator = service.createControlValidator(template, 'max');

      expect(validator.key).toBe('max');
      expect(validator.factory).toBeDefined();
      expect(validator.enabled).toBe(true);
      expect(validator.parameters).toBeUndefined();
      expect(validator.validatorFn).toBeUndefined();
    })
  );

  it('returns control validator for minLength',
    inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
      const template = <DynamicFormControlTemplate>{ input: { minLength: 5 }, validation: { minLength: true } };
      const validator = service.createControlValidator(template, 'minLength');

      expect(validator.key).toBe('minLength');
      expect(validator.factory).toBeDefined();
      expect(validator.enabled).toBe(true);
      expect(validator.parameters).toBe(5);
      expect(validator.validatorFn).toBeDefined();
    })
  );

  it('returns control validator for minLength with validatorFn being undefined',
    inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
      const template = <DynamicFormControlTemplate>{ input: {}, validation: { minLength: true } };
      const validator = service.createControlValidator(template, 'minLength');

      expect(validator.key).toBe('minLength');
      expect(validator.factory).toBeDefined();
      expect(validator.enabled).toBe(true);
      expect(validator.parameters).toBeUndefined();
      expect(validator.validatorFn).toBeUndefined();
    })
  );

  it('returns control validator for maxLength',
    inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
      const template = <DynamicFormControlTemplate>{ input: { maxLength: 10 }, validation: { maxLength: true } };
      const validator = service.createControlValidator(template, 'maxLength');

      expect(validator.key).toBe('maxLength');
      expect(validator.factory).toBeDefined();
      expect(validator.enabled).toBe(true);
      expect(validator.parameters).toBe(10);
      expect(validator.validatorFn).toBeDefined();
    })
  );

  it('returns control validator for maxLength with validatorFn being undefined',
    inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
      const template = <DynamicFormControlTemplate>{ input: {}, validation: { maxLength: true } };
      const validator = service.createControlValidator(template, 'maxLength');

      expect(validator.key).toBe('maxLength');
      expect(validator.factory).toBeDefined();
      expect(validator.enabled).toBe(true);
      expect(validator.parameters).toBeUndefined();
      expect(validator.validatorFn).toBeUndefined();
    })
  );

  it('returns control validator being undefined if template is invalid',
    inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
      const validator = service.createControlValidator(null, 'required');

      expect(validator).toBeUndefined();
    })
  );

  it('returns control validator being undefined if validation is invalid',
    inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
      const template = <DynamicFormControlTemplate>{ input: {}, validation: { required: null } };
      const validator = service.createControlValidator(template, 'required');

      expect(validator).toBeUndefined();
    })
  );

  it('returns control validator being undefined if validator factory is not available',
    inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
      const template = <DynamicFormControlTemplate>{ input: { type: 'textarea' }, validation: { json: true } };
      const validator = service.createControlValidator(template, 'json');

      expect(validator).toBeUndefined();
    })
  );
});
