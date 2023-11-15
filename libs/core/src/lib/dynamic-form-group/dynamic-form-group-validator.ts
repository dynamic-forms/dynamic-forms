import { FormGroupBase } from '../dynamic-form-field/dynamic-form-field-control';
import {
  DynamicFormFieldAsyncValidator,
  DynamicFormFieldAsyncValidatorFactory,
  DynamicFormFieldAsyncValidatorFn,
  DynamicFormFieldValidator,
  DynamicFormFieldValidatorFactory,
  DynamicFormFieldValidatorFn,
} from '../dynamic-form-field/dynamic-form-field-validator';
import { DynamicFormGroup } from './dynamic-form-group';

export type DynamicFormGroupValidatorFn<Value extends { [key: string]: any } = any> = DynamicFormFieldValidatorFn<
  Value,
  FormGroupBase<Value>
>;

export type DynamicFormGroupAsyncValidatorFn<Value extends { [key: string]: any } = any> = DynamicFormFieldAsyncValidatorFn<
  Value,
  FormGroupBase<Value>
>;

export type DynamicFormGroupValidatorFactory<
  Value extends { [key: string]: any } = any,
  Model extends Value = Value,
> = DynamicFormFieldValidatorFactory<Value, Model, FormGroupBase<Value>, DynamicFormGroup<Value, Model>>;

export type DynamicFormGroupAsyncValidatorFactory<
  Value extends { [key: string]: any } = any,
  Model extends Value = Value,
> = DynamicFormFieldAsyncValidatorFactory<Value, Model, FormGroupBase<Value>, DynamicFormGroup<Value, Model>>;

export class DynamicFormGroupValidator<
  Value extends { [key: string]: any } = any,
  Model extends Value = Value,
> extends DynamicFormFieldValidator<Value, Model, FormGroupBase<Value>, DynamicFormGroup<Value, Model>> {
  constructor(factory: DynamicFormGroupValidatorFactory, key: string, field: DynamicFormGroup, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template[this.key];
  }
}

export class DynamicFormGroupAsyncValidator<
  Value extends { [key: string]: any } = any,
  Model extends Value = Value,
> extends DynamicFormFieldAsyncValidator<Value, Model, FormGroupBase<Value>, DynamicFormGroup> {
  constructor(factory: DynamicFormGroupAsyncValidatorFactory, key: string, field: DynamicFormGroup, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template[this.key];
  }
}
