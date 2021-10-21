import { inject, TestBed } from '@angular/core/testing';
import { DynamicFormArray } from '../dynamic-form-array/dynamic-form-array';
import { DynamicFormArrayValidation } from '../dynamic-form-array/dynamic-form-array-validation';
import { dynamicFormArrayValidatorTypes, DynamicFormArrayValidatorType } from '../dynamic-form-array/dynamic-form-array-validator-type';
import { DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-array/dynamic-form-array-validator-type-config';
import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormControlDefinition } from '../dynamic-form-control/dynamic-form-control-definition';
import { DynamicFormControlValidation } from '../dynamic-form-control/dynamic-form-control-validation';
import {
  dynamicFormControlValidatorTypes, DynamicFormControlValidatorType
} from '../dynamic-form-control/dynamic-form-control-validator-type';
import { DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-control/dynamic-form-control-validator-type-config';
import { DynamicFormDictionary } from '../dynamic-form-dictionary/dynamic-form-dictionary';
import { DynamicFormDictionaryValidation } from '../dynamic-form-dictionary/dynamic-form-dictionary-validation';
import { dynamicFormDictionaryValidatorTypes } from '../dynamic-form-dictionary/dynamic-form-dictionary-validator-type';
import { DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-dictionary/dynamic-form-dictionary-validator-type-config';
import { DynamicFormFieldValidatorDefinition } from '../dynamic-form-field/dynamic-form-field-validator-definition';
import { DynamicFormGroup } from '../dynamic-form-group/dynamic-form-group';
import { DynamicFormGroupValidation } from '../dynamic-form-group/dynamic-form-group-validation';
import { dynamicFormGroupValidatorTypes, DynamicFormGroupValidatorType } from '../dynamic-form-group/dynamic-form-group-validator-type';
import { DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-group/dynamic-form-group-validator-type-config';
import { dynamicFormLibrary, DynamicFormLibrary, DynamicFormLibraryName } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormValidationBuilder } from './dynamic-form-validation.builder';

describe('DynamicFormValidationBuilder', () => {
  describe('with DynamicFormLibraryService', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          },
          DynamicFormValidationBuilder
        ]
      });
    });

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

    it('returns dictionary validator types being empty',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        expect(service.dictionaryValidatorTypes).toEqual([]);
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
        const arrayValidatorType = service.getDictionaryValidatorType('validator');

        expect(arrayValidatorType).toBeUndefined();
      })
    );

    it('returns dictionary validator type being undefined',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const dictionaryValidatorType = service.getDictionaryValidatorType('validator');

        expect(dictionaryValidatorType).toBeUndefined();
      })
    );
  });

  describe('with DynamicFormLibraryService and types for single library', () => {
    beforeEach(() => {
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
          {
            provide: DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG,
            useValue: dynamicFormDictionaryValidatorTypes
          },
          DynamicFormValidationBuilder
        ]
      });
    });

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

    it('returns provided dictionary validator types',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        expect(service.dictionaryValidatorTypes).toEqual(dynamicFormDictionaryValidatorTypes);
      })
    );

    it('returns control validator type for required',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const controlValidatorType = service.getControlValidatorType('required');

        expect(controlValidatorType).toEqual(dynamicFormControlValidatorTypes[0]);
      })
    );

    it('returns control validator for required',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const control = { definition: {}, template: { input: {}, validation: { required: true } } } as DynamicFormControl;
        const validator = service.createControlValidator(control, 'required');

        expect(validator.key).toBe('required');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBeUndefined();
        expect(validator.validatorFn).toBeTruthy();
      })
    );

    it('returns control validator for email',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const control = { definition: {}, template: { input: {}, validation: { email: true } } } as DynamicFormControl;
        const validator = service.createControlValidator(control, 'email');

        expect(validator.key).toBe('email');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBeUndefined();
        expect(validator.validatorFn).toBeTruthy();
      })
    );

    it('returns control validator for pattern',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const control = {
          definition: {},
          template: { input: { pattern: '[A-Za-z]*' }, validation: { pattern: true } }
        } as DynamicFormControl;
        const validator = service.createControlValidator(control, 'pattern');

        expect(validator.key).toBe('pattern');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBe('[A-Za-z]*');
        expect(validator.validatorFn).toBeTruthy();
      })
    );

    it('returns control validator for pattern with validatorFn being undefined',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const control = { definition: {}, template: { input: { pattern: null }, validation: { pattern: true } } } as DynamicFormControl;
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
        const control = { definition: {}, template: { input: { min: -10 }, validation: { min: true } } } as DynamicFormControl;
        const validator = service.createControlValidator(control, 'min');

        expect(validator.key).toBe('min');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBe(-10);
        expect(validator.validatorFn).toBeTruthy();
      })
    );

    it('returns control validator for min with validatorFn being undefined',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const control = { definition: {}, template: { input: {}, validation: { min: true } } } as DynamicFormControl;
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
        const control = { definition: {}, template: { input: { max: 10 }, validation: { max: true } } } as DynamicFormControl;
        const validator = service.createControlValidator(control, 'max');

        expect(validator.key).toBe('max');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBe(10);
        expect(validator.validatorFn).toBeTruthy();
      })
    );

    it('returns control validator for max with validatorFn being undefined',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const control = { definition: {}, template: { input: {}, validation: { max: true } } } as DynamicFormControl;
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
        const control = { definition: {}, template: { input: { minLength: 5 }, validation: { minLength: true } } } as DynamicFormControl;
        const validator = service.createControlValidator(control, 'minLength');

        expect(validator.key).toBe('minLength');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBe(5);
        expect(validator.validatorFn).toBeTruthy();
      })
    );

    it('returns control validator for minLength with validatorFn being undefined',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const control = { definition: {}, template: { input: {}, validation: { minLength: true } } } as DynamicFormControl;
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
        const control = { definition: {}, template: { input: { maxLength: 10 }, validation: { maxLength: true } } } as DynamicFormControl;
        const validator = service.createControlValidator(control, 'maxLength');

        expect(validator.key).toBe('maxLength');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBe(10);
        expect(validator.validatorFn).toBeTruthy();
      })
    );

    it('returns control validator for maxLength with validatorFn being undefined',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const control = { definition: {}, template: { input: {}, validation: { maxLength: true } } } as DynamicFormControl;
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
        const control = { definition: {}, template: null } as DynamicFormControl;
        const validator = service.createControlValidator(control, 'required');

        expect(validator).toBeUndefined();
      })
    );

    it('returns control validator being undefined if validation is invalid',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const control = { definition: {}, template: { input: {}, validation: { required: null } } } as DynamicFormControl;
        const validator = service.createControlValidator(control, 'required');

        expect(validator).toBeUndefined();
      })
    );

    it('returns control validator being undefined if validator factory is not available',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const validation = { json: true } as DynamicFormControlValidation;
        const control = { definition: {}, template: { input: { type: 'textarea' }, validation } } as DynamicFormControl;
        const validator = service.createControlValidator(control, 'json');

        expect(validator).toBeUndefined();
      })
    );

    it('returns control validator for validator definition',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const validators = {
          customMin: { type: 'min', parameters: -10, message: 'message' }
        } as { [key: string]: DynamicFormFieldValidatorDefinition };
        const definition = { validators } as DynamicFormControlDefinition;
        const validation = { customMin: true } as DynamicFormControlValidation;
        const control = { definition, template: { input: {}, validation } } as DynamicFormControl;
        const validator = service.createControlValidator(control, 'customMin');

        expect(validator.key).toBe('customMin');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBe(-10);
        expect(validator.validatorFn).toBeTruthy();
      })
    );

    it('returns group validator type for required',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const groupValidatorType = service.getGroupValidatorType('required');

        expect(groupValidatorType).toEqual(dynamicFormGroupValidatorTypes[0]);
      })
    );

    it('returns group validator for required',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const group = { definition: {}, template: { validation: { required: true } } } as DynamicFormGroup;
        const validator = service.createGroupValidator(group, 'required');

        expect(validator.key).toBe('required');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBeUndefined();
        expect(validator.validatorFn).toBeTruthy();
      })
    );

    it('returns group validator type for all required',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const groupValidatorType = service.getGroupValidatorType('allRequired');

        expect(groupValidatorType).toEqual(dynamicFormGroupValidatorTypes[1]);
      })
    );

    it('returns group validator for all required',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const group = { definition: {}, template: { validation: { allRequired: true } } } as DynamicFormGroup;
        const validator = service.createGroupValidator(group, 'allRequired');

        expect(validator.key).toBe('allRequired');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBeUndefined();
        expect(validator.validatorFn).toBeTruthy();
      })
    );

    it('returns group validator type for equal',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const groupValidatorType = service.getGroupValidatorType('equal');

        expect(groupValidatorType).toEqual(dynamicFormGroupValidatorTypes[2]);
      })
    );

    it('returns group validator for  equal',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const group = { definition: {}, template: { validation: { equal: true } } } as DynamicFormGroup;
        const validator = service.createGroupValidator(group, 'equal');

        expect(validator.key).toBe('equal');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBeUndefined();
        expect(validator.validatorFn).toBeTruthy();
      })
    );

    it('returns group validator being undefined if template is invalid',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const group = { definition: {}, template: null } as DynamicFormGroup;
        const validator = service.createGroupValidator(group, 'required');

        expect(validator).toBeUndefined();
      })
    );

    it('returns group validator being undefined if validation is invalid',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const group = { definition: {}, template: { validation: { required: null } } } as DynamicFormGroup;
        const validator = service.createGroupValidator(group, 'required');

        expect(validator).toBeUndefined();
      })
    );

    it('returns group validator being undefined if validator factory is not available',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const validation = { minLength: true } as DynamicFormGroupValidation;
        const group = { definition: {}, template: { validation } } as DynamicFormGroup;
        const validator = service.createGroupValidator(group, 'minLength');

        expect(validator).toBeUndefined();
      })
    );

    it('returns array validator type for required',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const arrayValidatorType = service.getArrayValidatorType('required');

        expect(arrayValidatorType).toEqual(dynamicFormArrayValidatorTypes[0]);
      })
    );

    it('returns array validator for required',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const array = { definition: {}, template: { validation: { required: true } } } as DynamicFormArray;
        const validator = service.createArrayValidator(array, 'required');

        expect(validator.key).toBe('required');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBeUndefined();
        expect(validator.validatorFn).toBeTruthy();
      })
    );

    it('returns array validator type for minLength',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const arrayValidatorType = service.getArrayValidatorType('minLength');

        expect(arrayValidatorType).toEqual(dynamicFormArrayValidatorTypes[1]);
      })
    );

    it('returns array validator for minLength',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const array = { definition: {}, template: { minLength: 2, validation: { minLength: true } } } as DynamicFormArray;
        const validator = service.createArrayValidator(array, 'minLength');

        expect(validator.key).toBe('minLength');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBe(2);
        expect(validator.validatorFn).toBeTruthy();
      })
    );

    it('returns array validator for minLength with validatorFn being undefined',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const array = { definition: {}, template: { validation: { minLength: true } } } as DynamicFormArray;
        const validator = service.createArrayValidator(array, 'minLength');

        expect(validator.key).toBe('minLength');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBeUndefined();
        expect(validator.validatorFn).toBeUndefined();
      })
    );

    it('returns array validator type for maxLength',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const arrayValidatorType = service.getArrayValidatorType('maxLength');

        expect(arrayValidatorType).toEqual(dynamicFormArrayValidatorTypes[2]);
      })
    );

    it('returns array validator for maxLength',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const array = { definition: {}, template: { maxLength: 5, validation: { maxLength: true } } } as DynamicFormArray;
        const validator = service.createArrayValidator(array, 'maxLength');

        expect(validator.key).toBe('maxLength');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBe(5);
        expect(validator.validatorFn).toBeTruthy();
      })
    );

    it('returns array validator for maxLength with validatorFn being undefined',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const array = { definition: {}, template: { validation: { maxLength: true } } } as DynamicFormArray;
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
        const array = { definition: {}, template: null } as DynamicFormArray;
        const validator = service.createArrayValidator(array, 'minLength');

        expect(validator).toBeUndefined();
      })
    );

    it('returns array validator being undefined if validation is invalid',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const array = { definition: {}, template: { validation: { minLength: null } } } as DynamicFormArray;
        const validator = service.createArrayValidator(array, 'minLength');

        expect(validator).toBeUndefined();
      })
    );

    it('returns array validator being undefined if validator factory is not available',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const validation = { required: true } as DynamicFormArrayValidation;
        const array = { definition: {}, template: { validation } } as DynamicFormArray;
        const validator = service.createArrayValidator(array, 'valid');

        expect(validator).toBeUndefined();
      })
    );

    it('returns dictionary validator type for required',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const dictionaryValidatorType = service.getDictionaryValidatorType('required');

        expect(dictionaryValidatorType).toEqual(dynamicFormDictionaryValidatorTypes[0]);
      })
    );

    it('returns dictionary validator for required',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const dictionary = { definition: {}, template: { validation: { required: true } } } as DynamicFormDictionary;
        const validator = service.createDictionaryValidator(dictionary, 'required');

        expect(validator.key).toBe('required');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBeUndefined();
        expect(validator.validatorFn).toBeTruthy();
      })
    );

    it('returns dictionary validator type for minLength',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const dictionaryValidatorType = service.getDictionaryValidatorType('minLength');

        expect(dictionaryValidatorType).toEqual(dynamicFormDictionaryValidatorTypes[1]);
      })
    );

    it('returns dictionary validator for minLength',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const dictionary = { definition: {}, template: { minLength: 2, validation: { minLength: true } } } as DynamicFormDictionary;
        const validator = service.createDictionaryValidator(dictionary, 'minLength');

        expect(validator.key).toBe('minLength');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBe(2);
        expect(validator.validatorFn).toBeTruthy();
      })
    );

    it('returns dictionary validator for minLength with validatorFn being undefined',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const dictionary = { definition: {}, template: { validation: { minLength: true } } } as DynamicFormDictionary;
        const validator = service.createDictionaryValidator(dictionary, 'minLength');

        expect(validator.key).toBe('minLength');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBeUndefined();
        expect(validator.validatorFn).toBeUndefined();
      })
    );

    it('returns dictionary validator type for maxLength',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const dictionaryValidatorType = service.getDictionaryValidatorType('maxLength');

        expect(dictionaryValidatorType).toEqual(dynamicFormDictionaryValidatorTypes[2]);
      })
    );

    it('returns dictionary validator for maxLength',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const dictionary = { definition: {}, template: { maxLength: 5, validation: { maxLength: true } } } as DynamicFormDictionary;
        const validator = service.createDictionaryValidator(dictionary, 'maxLength');

        expect(validator.key).toBe('maxLength');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBe(5);
        expect(validator.validatorFn).toBeTruthy();
      })
    );

    it('returns dictionary validator for maxLength with validatorFn being undefined',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const dictionary = { definition: {}, template: { validation: { maxLength: true } } } as DynamicFormDictionary;
        const validator = service.createDictionaryValidator(dictionary, 'maxLength');

        expect(validator.key).toBe('maxLength');
        expect(validator.factory).toEqual(jasmine.any(Function));
        expect(validator.enabled).toBe(true);
        expect(validator.parameters).toBeUndefined();
        expect(validator.validatorFn).toBeUndefined();
      })
    );

    it('returns dictionary validator being undefined if template is invalid',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const dictionary = { definition: {}, template: null } as DynamicFormDictionary;
        const validator = service.createDictionaryValidator(dictionary, 'minLength');

        expect(validator).toBeUndefined();
      })
    );

    it('returns dictionary validator being undefined if validation is invalid',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const dictionary = { definition: {}, template: { validation: { minLength: null } } } as DynamicFormDictionary;
        const validator = service.createDictionaryValidator(dictionary, 'minLength');

        expect(validator).toBeUndefined();
      })
    );

    it('returns dictionary validator being undefined if validator factory is not available',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        const validation = { required: true } as DynamicFormDictionaryValidation;
        const dictionary = { definition: {}, template: { validation } } as DynamicFormDictionary;
        const validator = service.createDictionaryValidator(dictionary, 'valid');

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
      { type: 'control-validator-1', factory: null, libraryName }
    ];
    const groupValidatorTypes: DynamicFormGroupValidatorType[] = [
      { type: 'group-validator-1', factory: null, libraryName: coreLibraryName },
      { type: 'group-validator-2', factory: null, libraryName: coreLibraryName },
      { type: 'group-validator-1', factory: null, libraryName: otherLibraryName },
      { type: 'group-validator-2', factory: null, libraryName: otherLibraryName },
      { type: 'group-validator-3', factory: null, libraryName: otherLibraryName },
      { type: 'group-validator-1', factory: null, libraryName }
    ];
    const arrayValidatorTypes: DynamicFormArrayValidatorType[] = [
      { type: 'array-validator-1', factory: null, libraryName: coreLibraryName },
      { type: 'array-validator-2', factory: null, libraryName: coreLibraryName },
      { type: 'array-validator-1', factory: null, libraryName: otherLibraryName },
      { type: 'array-validator-2', factory: null, libraryName: otherLibraryName },
      { type: 'array-validator-3', factory: null, libraryName: otherLibraryName },
      { type: 'array-validator-1', factory: null, libraryName }
    ];
    const dictionaryValidatorTypes: DynamicFormArrayValidatorType[] = [
      { type: 'dictionary-validator-1', factory: null, libraryName: coreLibraryName },
      { type: 'dictionary-validator-2', factory: null, libraryName: coreLibraryName },
      { type: 'dictionary-validator-1', factory: null, libraryName: otherLibraryName },
      { type: 'dictionary-validator-2', factory: null, libraryName: otherLibraryName },
      { type: 'dictionary-validator-3', factory: null, libraryName: otherLibraryName },
      { type: 'dictionary-validator-1', factory: null, libraryName }
    ];

    beforeEach(() => {
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
          {
            provide: DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG,
            useValue: dictionaryValidatorTypes
          },
          DynamicFormValidationBuilder
        ]
      });
    });

    it('returns provided types being filtered and merged',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        expect(service.controlValidatorTypes).toEqual([
          { type: 'control-validator-1', factory: null, libraryName },
          { type: 'control-validator-2', factory: null, libraryName: coreLibraryName }
        ]);
        expect(service.groupValidatorTypes).toEqual([
          { type: 'group-validator-1', factory: null, libraryName },
          { type: 'group-validator-2', factory: null, libraryName: coreLibraryName }
        ]);
        expect(service.arrayValidatorTypes).toEqual([
          { type: 'array-validator-1', factory: null, libraryName },
          { type: 'array-validator-2', factory: null, libraryName: coreLibraryName }
        ]);
        expect(service.dictionaryValidatorTypes).toEqual([
          { type: 'dictionary-validator-1', factory: null, libraryName },
          { type: 'dictionary-validator-2', factory: null, libraryName: coreLibraryName }
        ]);
      })
    );
  });
});
