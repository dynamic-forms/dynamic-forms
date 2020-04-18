import { FormArray } from '@angular/forms';
import { DynamicFormFieldValidator, DynamicFormFieldValidatorFactory, DynamicFormFieldValidatorFn } from '../dynamic-form-field/dynamic-form-field-validator';
import { DynamicFormArray } from './dynamic-form-array';

export type DynamicFormArrayValidatorFn = DynamicFormFieldValidatorFn<FormArray>;

export type DynamicFormArrayValidatorFactory = DynamicFormFieldValidatorFactory<FormArray>;

export class DynamicFormArrayValidator extends DynamicFormFieldValidator<FormArray, DynamicFormArray> {

  constructor(key: string, field: DynamicFormArray, factory: DynamicFormArrayValidatorFactory) {
    super(key, field, factory);
  }

  protected getEnabled(): boolean {
    return false;
  }

  protected getParameters(): any {
    return this._field.template[this._key];
  }
}
