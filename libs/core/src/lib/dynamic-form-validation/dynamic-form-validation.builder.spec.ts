import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormControlTemplate } from '../dynamic-form-control/dynamic-form-control-template';
import { dynamicFormControlValidatorTypes, DynamicFormControlValidatorTypes,
  DYNAMIC_FORM_CONTROL_VALIDATOR_TYPES } from '../dynamic-form-control/dynamic-form-control-validator-type';
import { dynamicFormLibrary, DynamicFormLibrary, DynamicFormLibraryName } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormValidationBuilder } from './dynamic-form-validation.builder';

describe('DynamicFormValidationBuilder', () => {
  describe('with DynamicFormLibraryService', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          },
          DynamicFormValidationBuilder
        ]
      });
    }));

    it('returns types being empty',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        expect(service.controlValidatorTypes).toEqual([]);
      })
    );


    it('returns DynamicFormControlValidatorType being undefined',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const controlValidatorType = service.getControlValidatorType('validator');

        expect(controlValidatorType).toBeUndefined();
      })
    );
  });

  describe('with DynamicFormLibraryService and types for single library', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: dynamicFormLibrary.name })
          },
          {
            provide: DYNAMIC_FORM_CONTROL_VALIDATOR_TYPES,
            useValue: dynamicFormControlValidatorTypes
          },
          DynamicFormValidationBuilder
        ]
      });
    }));

    it('returns provided types',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        expect(service.controlValidatorTypes).toEqual(dynamicFormControlValidatorTypes);
      })
    );

    it('returns DynamicFormControlValidatorType',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const controlValidatorType = service.getControlValidatorType('required');

        expect(controlValidatorType).toEqual(dynamicFormControlValidatorTypes[0]);
      })
    );

    it('returns control validator for required',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const template = <DynamicFormControlTemplate>{ input: {}, validation: { required: true } };
        const validator = service.createControlValidator(template, 'required');

        expect(validator.key).toBe('required');
        expect(validator.factory).toEqual(jasmine.any(Function));
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
        expect(validator.factory).toEqual(jasmine.any(Function));
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
        expect(validator.factory).toEqual(jasmine.any(Function));
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
        expect(validator.factory).toEqual(jasmine.any(Function));
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
        expect(validator.factory).toEqual(jasmine.any(Function));
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
        expect(validator.factory).toEqual(jasmine.any(Function));
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
        expect(validator.factory).toEqual(jasmine.any(Function));
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
        expect(validator.factory).toEqual(jasmine.any(Function));
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
        expect(validator.factory).toEqual(jasmine.any(Function));
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
        expect(validator.factory).toEqual(jasmine.any(Function));
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
        expect(validator.factory).toEqual(jasmine.any(Function));
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
        expect(validator.factory).toEqual(jasmine.any(Function));
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

  describe('with DynamicFormLibraryService and types for multiple libraries', () => {
    const coreLibraryName: DynamicFormLibraryName = dynamicFormLibrary.name;
    const otherLibraryName: DynamicFormLibraryName = 'other';
    const libraryName: DynamicFormLibraryName = 'test';
    const library: DynamicFormLibrary = { name: libraryName, references: [ coreLibraryName ] };

    const controlValidatorTypes: DynamicFormControlValidatorTypes = [
      { type: 'validator-1', factory: null, libraryName: coreLibraryName },
      { type: 'validator-2', factory: null, libraryName: coreLibraryName },
      { type: 'validator-1', factory: null, libraryName: otherLibraryName },
      { type: 'validator-2', factory: null, libraryName: otherLibraryName },
      { type: 'validator-3', factory: null, libraryName: otherLibraryName },
      { type: 'validator-1', factory: null, libraryName: libraryName }
    ];

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService(library)
          },
          {
            provide: DYNAMIC_FORM_CONTROL_VALIDATOR_TYPES,
            useValue: controlValidatorTypes
          },
          DynamicFormValidationBuilder
        ]
      });
    }));

    it('returns provided types being filtered and merged',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        expect(service.controlValidatorTypes).toEqual([
          { type: 'validator-1', factory: null, libraryName: libraryName },
          { type: 'validator-2', factory: null, libraryName: coreLibraryName }
        ]);
      })
    );
  });
});
