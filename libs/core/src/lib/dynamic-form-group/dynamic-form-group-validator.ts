import { FormGroupBase } from '../dynamic-form-field/dynamic-form-field-control';
import {
  DynamicFormFieldAsyncValidator, DynamicFormFieldAsyncValidatorFactory, DynamicFormFieldAsyncValidatorFn,
  DynamicFormFieldValidator, DynamicFormFieldValidatorFactory, DynamicFormFieldValidatorFn,
} from '../dynamic-form-field/dynamic-form-field-validator';
import { DynamicFormGroup } from './dynamic-form-group';

export type DynamicFormGroupValidatorFn<TValue extends { [key: string]: any } = any> =
  DynamicFormFieldValidatorFn<TValue, FormGroupBase<TValue>>;

export type DynamicFormGroupAsyncValidatorFn<TValue extends { [key: string]: any } = any> =
  DynamicFormFieldAsyncValidatorFn<TValue, FormGroupBase<TValue>>;

export type DynamicFormGroupValidatorFactory<TValue extends { [key: string]: any } = any, TModel extends TValue = TValue> =
  DynamicFormFieldValidatorFactory<TValue, TModel, FormGroupBase<TValue>, DynamicFormGroup<TValue, TModel>>;

export type DynamicFormGroupAsyncValidatorFactory<TValue extends { [key: string]: any } = any, TModel extends TValue = TValue> =
  DynamicFormFieldAsyncValidatorFactory<TValue, TModel, FormGroupBase<TValue>, DynamicFormGroup<TValue, TModel>>;

export class DynamicFormGroupValidator<TValue extends { [key: string]: any } = any, TModel extends TValue = TValue>
  extends DynamicFormFieldValidator<TValue, TModel, FormGroupBase<TValue>, DynamicFormGroup<TValue, TModel>> {

  constructor(factory: DynamicFormGroupValidatorFactory, key: string, field: DynamicFormGroup, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template[this.key];
  }
}

export class DynamicFormGroupAsyncValidator<TValue extends { [key: string]: any } = any, TModel extends TValue = TValue>
  extends DynamicFormFieldAsyncValidator<TValue, TModel, FormGroupBase<TValue>, DynamicFormGroup> {

  constructor(factory: DynamicFormGroupAsyncValidatorFactory, key: string, field: DynamicFormGroup, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template[this.key];
  }
}
