import { FormControl } from '@angular/forms';
import { DynamicFormControlValidatorFn } from '../../dynamic-form-control/dynamic-form-control-validator';
import { DynamicFormControlValidatorType } from '../../dynamic-form-control/dynamic-form-control-validator-type';
import { dynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { withDynamicFormControlValidatorFactory } from '../../dynamic-form-validation/dynamic-form-validation.module';
import { DynamicFormsFeature } from '../../dynamic-forms-feature';
import { DynamicFormDateConverter } from './dynamic-form-date-converter';

export const dynamicFormMinDateValidatorFactory = (
  minDate: any,
  __,
  ___,
  ____,
  [dateConverter]: [DynamicFormDateConverter],
): DynamicFormControlValidatorFn => {
  const dateMin = dateConverter.parse(minDate);
  return dateConverter.isValid(dateMin)
    ? (control: FormControl) => {
        const date = dateConverter.parse(control.value);
        return dateConverter.isValid(date) && dateConverter.compare(date, dateMin) < 0 ? { minDate: { minDate } } : null;
      }
    : undefined;
};

export const dynamicFormMaxDateValidatorFactory = (
  maxDate: any,
  __,
  ___,
  ____,
  [dateConverter]: [DynamicFormDateConverter],
): DynamicFormControlValidatorFn => {
  const dateMax = dateConverter.parse(maxDate);
  return dateConverter.isValid(dateMax)
    ? (control: FormControl) => {
        const date = dateConverter.parse(control.value);
        return dateConverter.isValid(date) && dateConverter.compare(date, dateMax) > 0 ? { maxDate: { maxDate } } : null;
      }
    : undefined;
};

export const dynamicFormMinDateValidatorTypeFactory = (dateAdapter: DynamicFormDateConverter): DynamicFormControlValidatorType => {
  return {
    type: 'minDate',
    factory: dynamicFormMinDateValidatorFactory,
    deps: [dateAdapter],
    libraryName: dynamicFormLibrary.name,
  };
};

export const dynamicFormMaxDateValidatorTypeFactory = (dateAdapter: DynamicFormDateConverter): DynamicFormControlValidatorType => {
  return {
    type: 'maxDate',
    factory: dynamicFormMaxDateValidatorFactory,
    deps: [dateAdapter],
    libraryName: dynamicFormLibrary.name,
  };
};

export function withDynamicFormDatepickerValidators(): DynamicFormsFeature[] {
  return [
    withDynamicFormControlValidatorFactory(dynamicFormMinDateValidatorTypeFactory, [DynamicFormDateConverter]),
    withDynamicFormControlValidatorFactory(dynamicFormMaxDateValidatorTypeFactory, [DynamicFormDateConverter]),
  ];
}
