import { TestBed, inject } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import {
  DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG,
  DynamicFormControlValidatorTypeConfig,
} from '../../dynamic-form-control/dynamic-form-control-validator-type-config';
import {
  DynamicFormDateConverter,
  DynamicFormNativeDateConverter,
  withDynamicFormNativeDateConverter,
} from '../../dynamic-form-converters/dynamic-form-date-converter';
import { importDynamicFormsProviders } from '../../dynamic-forms.module';
import {
  dynamicFormMaxDateValidatorFactory,
  dynamicFormMaxDateValidatorTypeFactory,
  dynamicFormMinDateValidatorFactory,
  dynamicFormMinDateValidatorTypeFactory,
  withDynamicFormDatepickerValidators,
} from './dynamic-form-datepicker-validators';

describe('DynamicFormDatepickerValidators', () => {
  let dateConverter: DynamicFormDateConverter;

  beforeEach(() => {
    dateConverter = new DynamicFormNativeDateConverter();
  });

  describe('dynamicFormMinDateValidatorFactory', () => {
    it('returns validatorFn being undefined if minDate is not valid', () => {
      const validatorFn = dynamicFormMinDateValidatorFactory(null, null, null, null, [dateConverter]);

      expect(validatorFn).toBeUndefined();
    });

    it('returns validatorFn being defined if minDate is valid', () => {
      const validatorFn = dynamicFormMinDateValidatorFactory('2023-01-01', null, null, null, [dateConverter]);

      expect(validatorFn).toBeTruthy();
    });

    it('validatorFn returns no error if control value is not defined', () => {
      const validatorFn = dynamicFormMinDateValidatorFactory('2023-01-01', null, null, null, [dateConverter]);
      const formControl = { value: null } as FormControl;

      expect(validatorFn(formControl)).toBeNull();
    });

    it('validatorFn returns no error if control value is greater than min date', () => {
      const validatorFn = dynamicFormMinDateValidatorFactory('2023-01-01', null, null, null, [dateConverter]);
      const formControl = { value: '2024-01-01' } as FormControl;

      expect(validatorFn(formControl)).toBeNull();
    });

    it('validatorFn returns no error if control value equals min date', () => {
      const validatorFn = dynamicFormMinDateValidatorFactory('2023-01-01', null, null, null, [dateConverter]);
      const formControl = { value: '2023-01-01' } as FormControl;

      expect(validatorFn(formControl)).toBeNull();
    });

    it('validatorFn returns error if control value is less than min date', () => {
      const validatorFn = dynamicFormMinDateValidatorFactory('2023-01-01', null, null, null, [dateConverter]);
      const formControl = { value: '2022-12-31' } as FormControl;

      expect(validatorFn(formControl)).toEqual({ minDate: { minDate: '2023-01-01' } });
    });
  });

  describe('dynamicFormMaxDateValidatorFactory', () => {
    it('returns validatorFn being undefined if maxDate is not valid', () => {
      const validatorFn = dynamicFormMaxDateValidatorFactory(null, null, null, null, [dateConverter]);

      expect(validatorFn).toBeUndefined();
    });

    it('returns validatorFn being defined if maxDate is valid', () => {
      const validatorFn = dynamicFormMaxDateValidatorFactory('2024-01-01', null, null, null, [dateConverter]);

      expect(validatorFn).toBeTruthy();
    });

    it('validatorFn returns no error if control value is not defined', () => {
      const validatorFn = dynamicFormMaxDateValidatorFactory('2024-01-01', null, null, null, [dateConverter]);
      const formControl = { value: null } as FormControl;

      expect(validatorFn(formControl)).toBeNull();
    });

    it('validatorFn returns no error if control value is less than max date', () => {
      const validatorFn = dynamicFormMaxDateValidatorFactory('2024-01-01', null, null, null, [dateConverter]);
      const formControl = { value: '2023-01-01' } as FormControl;

      expect(validatorFn(formControl)).toBeNull();
    });

    it('validatorFn returns no error if control value equals max date', () => {
      const validatorFn = dynamicFormMaxDateValidatorFactory('2024-01-01', null, null, null, [dateConverter]);
      const formControl = { value: '2024-01-01' } as FormControl;

      expect(validatorFn(formControl)).toBeNull();
    });

    it('validatorFn returns error if control value is greater than min date', () => {
      const validatorFn = dynamicFormMaxDateValidatorFactory('2024-01-01', null, null, null, [dateConverter]);
      const formControl = { value: '2024-01-02' } as FormControl;

      expect(validatorFn(formControl)).toEqual({ maxDate: { maxDate: '2024-01-01' } });
    });
  });

  describe('withDynamicFormDatepickerValidators', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: importDynamicFormsProviders(withDynamicFormNativeDateConverter(), ...withDynamicFormDatepickerValidators()),
      });
    });

    it('provides DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG with min date and max date validator', inject(
      [DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG, DynamicFormDateConverter],
      (config: DynamicFormControlValidatorTypeConfig, dateConverter: DynamicFormDateConverter) => {
        expect(config.length).toBe(2);
        expect(config[0]).toEqual(dynamicFormMinDateValidatorTypeFactory(dateConverter));
        expect(config[1]).toEqual(dynamicFormMaxDateValidatorTypeFactory(dateConverter));
      },
    ));
  });
});
