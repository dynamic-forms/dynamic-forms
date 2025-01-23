import { FormRecordBase } from '../dynamic-form-field/dynamic-form-field-control';
import {
  DynamicFormFieldAsyncValidator,
  DynamicFormFieldAsyncValidatorFactory,
  DynamicFormFieldAsyncValidatorFn,
  DynamicFormFieldValidator,
  DynamicFormFieldValidatorFactory,
  DynamicFormFieldValidatorFn,
} from '../dynamic-form-field/dynamic-form-field-validator';
import { DynamicFormDictionary } from './dynamic-form-dictionary';

export type DynamicFormDictionaryValidatorFn<Value = any> = DynamicFormFieldValidatorFn<Record<string, Value>, FormRecordBase<Value>>;

export type DynamicFormDictionaryAsyncValidatorFn<Value = any> = DynamicFormFieldAsyncValidatorFn<
  Record<string, Value>,
  FormRecordBase<Value>
>;

export type DynamicFormDictionaryValidatorFactory<Value = any, Model extends Value = Value> = DynamicFormFieldValidatorFactory<
  Record<string, Value>,
  Record<string, Model>,
  FormRecordBase<Value>,
  DynamicFormDictionary<Value, Model>
>;

export type DynamicFormDictionaryAsyncValidatorFactory<Value = any, Model extends Value = Value> = DynamicFormFieldAsyncValidatorFactory<
  Record<string, Value>,
  Record<string, Model>,
  FormRecordBase<Value>,
  DynamicFormDictionary<Value, Model>
>;

export class DynamicFormDictionaryValidator<Value = any, Model extends Value = Value> extends DynamicFormFieldValidator<
  Record<string, Value>,
  Record<string, Model>,
  FormRecordBase<Value>,
  DynamicFormDictionary<Value, Model>
> {
  constructor(factory: DynamicFormDictionaryValidatorFactory, key: string, field: DynamicFormDictionary, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template[this.key];
  }
}

export class DynamicFormDictionaryAsyncValidator<Value = any, Model extends Value = Value> extends DynamicFormFieldAsyncValidator<
  Record<string, Value>,
  Record<string, Model>,
  FormRecordBase<Value>,
  DynamicFormDictionary<Value, Model>
> {
  constructor(factory: DynamicFormDictionaryAsyncValidatorFactory, key: string, field: DynamicFormDictionary, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template[this.key];
  }
}
