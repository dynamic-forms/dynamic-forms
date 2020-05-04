import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormArray } from '../dynamic-form-array/dynamic-form-array';
import { DynamicFormArrayValidation } from '../dynamic-form-array/dynamic-form-array-validation';
import { dynamicFormArrayValidatorTypes, DynamicFormArrayValidatorType } from '../dynamic-form-array/dynamic-form-array-validator-type';
import { DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-array/dynamic-form-array-validator-type-config';
import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormControlValidation } from '../dynamic-form-control/dynamic-form-control-validation';
import { dynamicFormControlValidatorTypes, DynamicFormControlValidatorType } from '../dynamic-form-control/dynamic-form-control-validator-type';
import { DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-control/dynamic-form-control-validator-type-config';
import { DynamicFormGroup } from '../dynamic-form-group/dynamic-form-group';
import { DynamicFormGroupValidation } from '../dynamic-form-group/dynamic-form-group-validation';
import { dynamicFormGroupValidatorTypes, DynamicFormGroupValidatorType } from '../dynamic-form-group/dynamic-form-group-validator-type';
import { DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-group/dynamic-form-group-validator-type-config';
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

    it('returns control validator types being empty',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        expect(service.controlValidatorTypes).toEqual([]);
      })
    );

    it('returns group validator types being empty',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        expect(service.groupValidatorTypes).toEqual([]);
      })
    );

    it('returns array validator types being empty',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        expect(service.arrayValidatorTypes).toEqual([]);
      })
    );

    it('returns control validator type being undefined',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const controlValidatorType = service.getControlValidatorType('validator');

        expect(controlValidatorType).toBeUndefined();
      })
    );

    it('returns group validator type being undefined',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const groupValidatorType = service.getGroupValidatorType('validator');

        expect(groupValidatorType).toBeUndefined();
      })
    );

    it('returns array validator type being undefined',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const arrayValidatorType = service.getArrayValidatorType('validator');

        expect(arrayValidatorType).toBeUndefined();
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
            provide: DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG,
            useValue: dynamicFormControlValidatorTypes
          },
          {
            provide: DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG,
            useValue: dynamicFormGroupValidatorTypes
          },
          {
            provide: DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG,
            useValue: dynamicFormArrayValidatorTypes
          },
          DynamicFormValidationBuilder
        ]
      });
    }));

    it('returns provided control validator types',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        expect(service.controlValidatorTypes).toEqual(dynamicFormControlValidatorTypes);
      })
    );

    it('returns provided group validator types',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        expect(service.groupValidatorTypes).toEqual(dynamicFormGroupValidatorTypes);
      })
    );

    it('returns provided array validator types',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        expect(service.arrayValidatorTypes).toEqual(dynamicFormArrayValidatorTypes);
      })
    );

    it('returns control valiator type for required',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const controlValidatorType = service.getControlValidatorType('required');

        expect(controlValidatorType).toEqual(dynamicFormControlValidatorTypes[0]);
      })
    );

    it('returns control validator for required',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const control = <DynamicFormControl>{ definition: {}, template: { input: {}, validation: { required: true } } };
        const validator = service.createControlValidator(control, 'required');

        expect(validator.key).toBe('required');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBeUndefined();
        expect(validator.validatorFn).toBeDefined();
      })
    );

    it('returns control validator for email',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const control = <DynamicFormControl>{ definition: {}, template: { input: {}, validation: { email: true } } };
        const validator = service.createControlValidator(control, 'email');

        expect(validator.key).toBe('email');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBeUndefined();
        expect(validator.validatorFn).toBeDefined();
      })
    );

    it('returns control validator for pattern',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const control = <DynamicFormControl>{
          definition: {},
          template: { input: { pattern: '[A-Za-z]*' }, validation: { pattern: true } }
        };
        const validator = service.createControlValidator(control, 'pattern');

        expect(validator.key).toBe('pattern');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBe('[A-Za-z]*');
        expect(validator.validatorFn).toBeDefined();
      })
    );

    it('returns control validator for pattern with validatorFn being undefined',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const control = <DynamicFormControl>{ definition: {}, template: { input: { pattern: null }, validation: { pattern: true } } };
        const validator = service.createControlValidator(control, 'pattern');

        expect(validator.key).toBe('pattern');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBeNull();
        expect(validator.validatorFn).toBeUndefined();
      })
    );

    it('returns control validator for min',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const control = <DynamicFormControl>{ definition: {}, template: { input: { min: -10 }, validation: { min: true } } };
        const validator = service.createControlValidator(control, 'min');

        expect(validator.key).toBe('min');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBe(-10);
        expect(validator.validatorFn).toBeDefined();
      })
    );

    it('returns control validator for min with validatorFn being undefined',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const control = <DynamicFormControl>{ definition: {}, template: { input: {}, validation: { min: true } } };
        const validator = service.createControlValidator(control, 'min');

        expect(validator.key).toBe('min');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBeUndefined();
        expect(validator.validatorFn).toBeUndefined();
      })
    );

    it('returns control validator for max',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const control = <DynamicFormControl>{ definition: {}, template: { input: { max: 10 }, validation: { max: true } } };
        const validator = service.createControlValidator(control, 'max');

        expect(validator.key).toBe('max');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBe(10);
        expect(validator.validatorFn).toBeDefined();
      })
    );

    it('returns control validator for max with validatorFn being undefined',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const control = <DynamicFormControl>{ definition: {}, template: { input: {}, validation: { max: true } } };
        const validator = service.createControlValidator(control, 'max');

        expect(validator.key).toBe('max');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBeUndefined();
        expect(validator.validatorFn).toBeUndefined();
      })
    );

    it('returns control validator for minLength',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const control = <DynamicFormControl>{ definition: {}, template: { input: { minLength: 5 }, validation: { minLength: true } } };
        const validator = service.createControlValidator(control, 'minLength');

        expect(validator.key).toBe('minLength');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBe(5);
        expect(validator.validatorFn).toBeDefined();
      })
    );

    it('returns control validator for minLength with validatorFn being undefined',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const control = <DynamicFormControl>{ definition: {}, template: { input: {}, validation: { minLength: true } } };
        const validator = service.createControlValidator(control, 'minLength');

        expect(validator.key).toBe('minLength');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBeUndefined();
        expect(validator.validatorFn).toBeUndefined();
      })
    );

    it('returns control validator for maxLength',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const control = <DynamicFormControl>{ definition: {}, template: { input: { maxLength: 10 }, validation: { maxLength: true } } };
        const validator = service.createControlValidator(control, 'maxLength');

        expect(validator.key).toBe('maxLength');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBe(10);
        expect(validator.validatorFn).toBeDefined();
      })
    );

    it('returns control validator for maxLength with validatorFn being undefined',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const control = <DynamicFormControl>{ definition: {}, template: { input: {}, validation: { maxLength: true } } };
        const validator = service.createControlValidator(control, 'maxLength');

        expect(validator.key).toBe('maxLength');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBeUndefined();
        expect(validator.validatorFn).toBeUndefined();
      })
    );

    it('returns control validator being undefined if template is invalid',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const control = <DynamicFormControl>{ definition: {}, template: null };
        const validator = service.createControlValidator(control, 'required');

        expect(validator).toBeUndefined();
      })
    );

    it('returns control validator being undefined if validation is invalid',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const control = <DynamicFormControl>{ definition: {}, template: { input: {}, validation: { required: null } } };
        const validator = service.createControlValidator(control, 'required');

        expect(validator).toBeUndefined();
      })
    );

    it('returns control validator being undefined if validator factory is not available',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const validation = <DynamicFormControlValidation>{ json: true };
        const control = <DynamicFormControl>{ definition: {}, template: { input: { type: 'textarea' }, validation } };
        const validator = service.createControlValidator(control, 'json');

        expect(validator).toBeUndefined();
      })
    );

    it('returns group valiator type for required',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const groupValidatorType = service.getGroupValidatorType('required');

        expect(groupValidatorType).toEqual(dynamicFormGroupValidatorTypes[0]);
      })
    );

    it('returns group validator for required',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const group = <DynamicFormGroup>{ definition: {}, template: { validation: { required: true } } };
        const validator = service.createGroupValidator(group, 'required');

        expect(validator.key).toBe('required');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBeUndefined();
        expect(validator.validatorFn).toBeDefined();
      })
    );

    it('returns group validator being undefined if template is invalid',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const group = <DynamicFormGroup>{ definition: {}, template: null };
        const validator = service.createGroupValidator(group, 'required');

        expect(validator).toBeUndefined();
      })
    );

    it('returns group validator being undefined if validation is invalid',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const group = <DynamicFormGroup>{ definition: {}, template: { validation: { required: null } } };
        const validator = service.createGroupValidator(group, 'required');

        expect(validator).toBeUndefined();
      })
    );

    it('returns group validator being undefined if validator factory is not available',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const validation = <DynamicFormGroupValidation>{ minLength: true };
        const group = <DynamicFormGroup>{ definition: {}, template: { validation } };
        const validator = service.createGroupValidator(group, 'minLength');

        expect(validator).toBeUndefined();
      })
    );

    it('returns array valiator type for minLength',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const arrayValidatorType = service.getArrayValidatorType('minLength');

        expect(arrayValidatorType).toEqual(dynamicFormArrayValidatorTypes[0]);
      })
    );

    it('returns array validator for minLength',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const array = <DynamicFormArray>{ definition: {}, template: { minLength: 2, validation: { minLength: true } } };
        const validator = service.createArrayValidator(array, 'minLength');

        expect(validator.key).toBe('minLength');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBe(2);
        expect(validator.validatorFn).toBeDefined();
      })
    );

    it('returns array validator for minLength with validatorFn being undefined',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const array = <DynamicFormArray>{ definition: {}, template: { validation: { minLength: true } } };
        const validator = service.createArrayValidator(array, 'minLength');

        expect(validator.key).toBe('minLength');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBeUndefined();
        expect(validator.validatorFn).toBeUndefined();
      })
    );

    it('returns array validator for maxLength',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const array = <DynamicFormArray>{ definition: {}, template: { maxLength: 5, validation: { maxLength: true } } };
        const validator = service.createArrayValidator(array, 'maxLength');

        expect(validator.key).toBe('maxLength');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBe(5);
        expect(validator.validatorFn).toBeDefined();
      })
    );

    it('returns array validator for maxLength with validatorFn being undefined',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const array = <DynamicFormArray>{ definition: {}, template: { validation: { maxLength: true } } };
        const validator = service.createArrayValidator(array, 'maxLength');

        expect(validator.key).toBe('maxLength');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBeUndefined();
        expect(validator.validatorFn).toBeUndefined();
      })
    );

    it('returns array validator being undefined if template is invalid',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const array = <DynamicFormArray>{ definition: {}, template: null };
        const validator = service.createArrayValidator(array, 'minLength');

        expect(validator).toBeUndefined();
      })
    );

    it('returns array validator being undefined if validation is invalid',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const array = <DynamicFormArray>{ definition: {}, template: { validation: { minLength: null } } };
        const validator = service.createArrayValidator(array, 'minLength');

        expect(validator).toBeUndefined();
      })
    );

    it('returns array validator being undefined if validator factory is not available',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const validation = <DynamicFormArrayValidation>{ required: true };
        const array = <DynamicFormArray>{ definition: {}, template: { validation } };
        const validator = service.createArrayValidator(array, 'required');

        expect(validator).toBeUndefined();
      })
    );
  });

  describe('with DynamicFormLibraryService and types for multiple libraries', () => {
    const coreLibraryName: DynamicFormLibraryName = dynamicFormLibrary.name;
    const otherLibraryName: DynamicFormLibraryName = 'other';
    const libraryName: DynamicFormLibraryName = 'test';
    const library: DynamicFormLibrary = { name: libraryName, references: [ coreLibraryName ] };

    const controlValidatorTypes: DynamicFormControlValidatorType[] = [
      { type: 'control-validator-1', factory: null, libraryName: coreLibraryName },
      { type: 'control-validator-2', factory: null, libraryName: coreLibraryName },
      { type: 'control-validator-1', factory: null, libraryName: otherLibraryName },
      { type: 'control-validator-2', factory: null, libraryName: otherLibraryName },
      { type: 'control-validator-3', factory: null, libraryName: otherLibraryName },
      { type: 'control-validator-1', factory: null, libraryName: libraryName }
    ];
    const groupValidatorTypes: DynamicFormGroupValidatorType[] = [
      { type: 'group-validator-1', factory: null, libraryName: coreLibraryName },
      { type: 'group-validator-2', factory: null, libraryName: coreLibraryName },
      { type: 'group-validator-1', factory: null, libraryName: otherLibraryName },
      { type: 'group-validator-2', factory: null, libraryName: otherLibraryName },
      { type: 'group-validator-3', factory: null, libraryName: otherLibraryName },
      { type: 'group-validator-1', factory: null, libraryName: libraryName }
    ];
    const arrayValidatorTypes: DynamicFormArrayValidatorType[] = [
      { type: 'array-validator-1', factory: null, libraryName: coreLibraryName },
      { type: 'array-validator-2', factory: null, libraryName: coreLibraryName },
      { type: 'array-validator-1', factory: null, libraryName: otherLibraryName },
      { type: 'array-validator-2', factory: null, libraryName: otherLibraryName },
      { type: 'array-validator-3', factory: null, libraryName: otherLibraryName },
      { type: 'array-validator-1', factory: null, libraryName: libraryName }
    ];

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService(library)
          },
          {
            provide: DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG,
            useValue: controlValidatorTypes
          },
          {
            provide: DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG,
            useValue: groupValidatorTypes
          },
          {
            provide: DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG,
            useValue: arrayValidatorTypes
          },
          DynamicFormValidationBuilder
        ]
      });
    }));

    it('returns provided types being filtered and merged',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        expect(service.controlValidatorTypes).toEqual([
          { type: 'control-validator-1', factory: null, libraryName: libraryName },
          { type: 'control-validator-2', factory: null, libraryName: coreLibraryName }
        ]);
        expect(service.groupValidatorTypes).toEqual([
          { type: 'group-validator-1', factory: null, libraryName: libraryName },
          { type: 'group-validator-2', factory: null, libraryName: coreLibraryName }
        ]);
        expect(service.arrayValidatorTypes).toEqual([
          { type: 'array-validator-1', factory: null, libraryName: libraryName },
          { type: 'array-validator-2', factory: null, libraryName: coreLibraryName }
        ]);
      })
    );
  });
});
