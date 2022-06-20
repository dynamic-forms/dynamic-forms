import { FormArrayBase } from '../dynamic-form-field/dynamic-form-field-control';
import {
  DynamicFormFieldAsyncValidatorFn, DynamicFormFieldAsyncValidatorFactory,DynamicFormFieldValidatorFactory,
  DynamicFormFieldValidatorFn, DynamicFormFieldAsyncValidator, DynamicFormFieldValidator,
} from '../dynamic-form-field/dynamic-form-field-validator';
import { DynamicFormArray } from './dynamic-form-array';

export type DynamicFormArrayValidatorFn<Value = any> =
  DynamicFormFieldValidatorFn<Value[], FormArrayBase<Value>>;

export type DynamicFormArrayAsyncValidatorFn<Value = any> =
  DynamicFormFieldAsyncValidatorFn<Value[], FormArrayBase<Value>>;

export type DynamicFormArrayValidatorFactory<Value = any, Model extends Value = Value> =
  DynamicFormFieldValidatorFactory<Value[], Model[], FormArrayBase<Value>, DynamicFormArray<Value, Model>>;

export type DynamicFormArrayAsyncValidatorFactory<Value = any, Model extends Value = Value> =
  DynamicFormFieldAsyncValidatorFactory<Value[], Model[], FormArrayBase<Value>, DynamicFormArray<Value, Model>>;

export class DynamicFormArrayValidator<Value = any, Model extends Value = Value>
  extends DynamicFormFieldValidator<Value[], Model[], FormArrayBase<Value>, DynamicFormArray<Value, Model>> {

  constructor(factory: DynamicFormArrayValidatorFactory, key: string, field: DynamicFormArray, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template[this.key];
  }
}

export class DynamicFormArrayAsyncValidator<Value = any, Model extends Value = Value>
  extends DynamicFormFieldAsyncValidator<Value[], Model[], FormArrayBase<Value>, DynamicFormArray<Value, Model>> {

  constructor(factory: DynamicFormArrayAsyncValidatorFactory, key: string, field: DynamicFormArray, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template[this.key];
  }
}
