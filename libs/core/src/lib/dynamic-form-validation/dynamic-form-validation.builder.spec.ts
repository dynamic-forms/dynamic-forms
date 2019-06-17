import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormValidationBuilder } from './dynamic-form-validation.builder';

describe('DynamicFormValidationBuilder', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        DynamicFormValidationBuilder
      ]
    });
  }));

  it('returns validator factory being undefined',
    inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
      const validatorFactory = service.getValidatorFactory('key');

      expect(validatorFactory).toBeUndefined();
    })
  );

  it('returns required validator factory',
    inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
      const validatorFactory = service.getValidatorFactory('required');

      expect(validatorFactory).toBeDefined();
      expect(validatorFactory(null)).toBeDefined();
    })
  );

  it('returns email validator factory',
    inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
      const validatorFactory = service.getValidatorFactory('email');

      expect(validatorFactory).toBeDefined();
      expect(validatorFactory(null)).toBeDefined();
    })
  );

  it('returns pattern validator factory',
    inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
      const validatorFactory = service.getValidatorFactory('pattern');

      expect(validatorFactory).toBeDefined();
      expect(validatorFactory('pattern')).toBeDefined();
      expect(validatorFactory(null)).toBeUndefined();
    })
  );

  it('returns min validator factory',
    inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
      const validatorFactory = service.getValidatorFactory('min');

      expect(validatorFactory).toBeDefined();
      expect(validatorFactory(1)).toBeDefined();
      expect(validatorFactory(null)).toBeUndefined();
    })
  );

  it('returns max validator factory',
    inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
      const validatorFactory = service.getValidatorFactory('max');

      expect(validatorFactory).toBeDefined();
      expect(validatorFactory(1)).toBeDefined();
      expect(validatorFactory(null)).toBeUndefined();
    })
  );

  it('returns minLength validator factory',
    inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
      const validatorFactory = service.getValidatorFactory('minLength');

      expect(validatorFactory).toBeDefined();
      expect(validatorFactory(1)).toBeDefined();
      expect(validatorFactory(null)).toBeUndefined();
    })
  );

  it('returns maxLength validator factory',
    inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
      const validatorFactory = service.getValidatorFactory('maxLength');

      expect(validatorFactory).toBeDefined();
      expect(validatorFactory(1)).toBeDefined();
      expect(validatorFactory(null)).toBeUndefined();
    })
  );
});
