import { FormArray } from '@angular/forms';
import {
  DynamicFormFieldAsyncValidatorFn, DynamicFormFieldAsyncValidatorFactory,DynamicFormFieldValidatorFactory,
  DynamicFormFieldValidatorFn, DynamicFormFieldAsyncValidator, DynamicFormFieldValidator,
} from '../dynamic-form-field/dynamic-form-field-validator';
import { DynamicFormArray } from './dynamic-form-array';

export type DynamicFormArrayValidatorFn = DynamicFormFieldValidatorFn<FormArray>;

export type DynamicFormArrayAsyncValidatorFn = DynamicFormFieldAsyncValidatorFn<FormArray>;

export type DynamicFormArrayValidatorFactory = DynamicFormFieldValidatorFactory<FormArray, DynamicFormArray>;

export type DynamicFormArrayAsyncValidatorFactory = DynamicFormFieldAsyncValidatorFactory<FormArray, DynamicFormArray>;

export class DynamicFormArrayValidator extends DynamicFormFieldValidator<FormArray, DynamicFormArray> {

  constructor(factory: DynamicFormArrayValidatorFactory, key: string, field: DynamicFormArray, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template[this.key];
  }
}

export class DynamicFormArrayAsyncValidator extends DynamicFormFieldAsyncValidator<FormArray, DynamicFormArray> {

  constructor(factory: DynamicFormArrayAsyncValidatorFactory, key: string, field: DynamicFormArray, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template[this.key];
  }
}
