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

export type DynamicFormDictionaryValidatorFn<Value = any> = DynamicFormFieldValidatorFn<{ [key: string]: Value }, FormRecordBase<Value>>;

export type DynamicFormDictionaryAsyncValidatorFn<Value = any> = DynamicFormFieldAsyncValidatorFn<
  { [key: string]: Value },
  FormRecordBase<Value>
>;

export type DynamicFormDictionaryValidatorFactory<Value = any, Model extends Value = Value> = DynamicFormFieldValidatorFactory<
  { [key: string]: Value },
  { [key: string]: Model },
  FormRecordBase<Value>,
  DynamicFormDictionary<Value, Model>
>;

export type DynamicFormDictionaryAsyncValidatorFactory<Value = any, Model extends Value = Value> = DynamicFormFieldAsyncValidatorFactory<
  { [key: string]: Value },
  { [key: string]: Model },
  FormRecordBase<Value>,
  DynamicFormDictionary<Value, Model>
>;

export class DynamicFormDictionaryValidator<Value = any, Model extends Value = Value> extends DynamicFormFieldValidator<
  { [key: string]: Value },
  { [key: string]: Model },
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
  { [key: string]: Value },
  { [key: string]: Model },
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
