import { UntypedFormArray } from '@angular/forms';
import {
  DynamicFormFieldAsyncValidatorFn, DynamicFormFieldAsyncValidatorFactory,DynamicFormFieldValidatorFactory,
  DynamicFormFieldValidatorFn, DynamicFormFieldAsyncValidator, DynamicFormFieldValidator
} from '../dynamic-form-field/dynamic-form-field-validator';
import { DynamicFormArray } from './dynamic-form-array';

export type DynamicFormArrayValidatorFn = DynamicFormFieldValidatorFn<UntypedFormArray>;

export type DynamicFormArrayAsyncValidatorFn = DynamicFormFieldAsyncValidatorFn<UntypedFormArray>;

export type DynamicFormArrayValidatorFactory = DynamicFormFieldValidatorFactory<UntypedFormArray, DynamicFormArray>;

export type DynamicFormArrayAsyncValidatorFactory = DynamicFormFieldAsyncValidatorFactory<UntypedFormArray, DynamicFormArray>;

export class DynamicFormArrayValidator extends DynamicFormFieldValidator<UntypedFormArray, DynamicFormArray> {

  constructor(factory: DynamicFormArrayValidatorFactory, key: string, field: DynamicFormArray, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template[this.key];
  }
}

export class DynamicFormArrayAsyncValidator extends DynamicFormFieldAsyncValidator<UntypedFormArray, DynamicFormArray> {

  constructor(factory: DynamicFormArrayAsyncValidatorFactory, key: string, field: DynamicFormArray, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template[this.key];
  }
}
