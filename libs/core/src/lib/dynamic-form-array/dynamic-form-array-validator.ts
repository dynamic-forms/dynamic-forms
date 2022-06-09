import { FormArrayBase } from '../dynamic-form-field/dynamic-form-field-control';
import {
  DynamicFormFieldAsyncValidatorFn, DynamicFormFieldAsyncValidatorFactory,DynamicFormFieldValidatorFactory,
  DynamicFormFieldValidatorFn, DynamicFormFieldAsyncValidator, DynamicFormFieldValidator,
} from '../dynamic-form-field/dynamic-form-field-validator';
import { DynamicFormArray } from './dynamic-form-array';

export type DynamicFormArrayValidatorFn<TValue = any> =
  DynamicFormFieldValidatorFn<TValue[], FormArrayBase<TValue>>;

export type DynamicFormArrayAsyncValidatorFn<TValue = any> =
  DynamicFormFieldAsyncValidatorFn<TValue[], FormArrayBase<TValue>>;

export type DynamicFormArrayValidatorFactory<TValue = any, TModel extends TValue = TValue> =
  DynamicFormFieldValidatorFactory<TValue[], TModel[], FormArrayBase<TValue>, DynamicFormArray<TValue, TModel>>;

export type DynamicFormArrayAsyncValidatorFactory<TValue = any, TModel extends TValue = TValue> =
  DynamicFormFieldAsyncValidatorFactory<TValue[], TModel[], FormArrayBase<TValue>, DynamicFormArray<TValue, TModel>>;

export class DynamicFormArrayValidator<TValue = any, TModel extends TValue = TValue>
  extends DynamicFormFieldValidator<TValue[], TModel[], FormArrayBase<TValue>, DynamicFormArray<TValue, TModel>> {

  constructor(factory: DynamicFormArrayValidatorFactory, key: string, field: DynamicFormArray, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template[this.key];
  }
}

export class DynamicFormArrayAsyncValidator<TValue = any, TModel extends TValue = TValue>
  extends DynamicFormFieldAsyncValidator<TValue[], TModel[], FormArrayBase<TValue>, DynamicFormArray<TValue, TModel>> {

  constructor(factory: DynamicFormArrayAsyncValidatorFactory, key: string, field: DynamicFormArray, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template[this.key];
  }
}
