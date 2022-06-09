import { FormRecordBase } from '../dynamic-form-field/dynamic-form-field-control';
import {
  DynamicFormFieldAsyncValidator, DynamicFormFieldAsyncValidatorFactory, DynamicFormFieldAsyncValidatorFn,
  DynamicFormFieldValidator, DynamicFormFieldValidatorFactory, DynamicFormFieldValidatorFn,
} from '../dynamic-form-field/dynamic-form-field-validator';
import { DynamicFormDictionary } from './dynamic-form-dictionary';

export type DynamicFormDictionaryValidatorFn<TValue = any> =
  DynamicFormFieldValidatorFn<{ [key: string]: TValue }, FormRecordBase<TValue>>;

export type DynamicFormDictionaryAsyncValidatorFn<TValue = any> =
  DynamicFormFieldAsyncValidatorFn<{ [key: string]: TValue }, FormRecordBase<TValue>>;

export type DynamicFormDictionaryValidatorFactory<TValue = any, TModel extends TValue = TValue> =
  DynamicFormFieldValidatorFactory<{ [key: string]: TValue }, { [key: string]: TModel },
    FormRecordBase<TValue>, DynamicFormDictionary<TValue, TModel>>;

export type DynamicFormDictionaryAsyncValidatorFactory<TValue = any, TModel extends TValue = TValue> =
  DynamicFormFieldAsyncValidatorFactory<{ [key: string]: TValue }, { [key: string]: TModel },
    FormRecordBase<TValue>, DynamicFormDictionary<TValue, TModel>>;

export class DynamicFormDictionaryValidator<TValue = any, TModel extends TValue = TValue>
  extends DynamicFormFieldValidator<{ [key: string]: TValue }, { [key: string]: TModel },
    FormRecordBase<TValue>, DynamicFormDictionary<TValue, TModel>> {

  constructor(factory: DynamicFormDictionaryValidatorFactory, key: string, field: DynamicFormDictionary, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template[this.key];
  }
}

export class DynamicFormDictionaryAsyncValidator<TValue = any, TModel extends TValue = TValue>
  extends DynamicFormFieldAsyncValidator<{ [key: string]: TValue }, { [key: string]: TModel },
  FormRecordBase<TValue>, DynamicFormDictionary<TValue, TModel>> {

  constructor(factory: DynamicFormDictionaryAsyncValidatorFactory, key: string, field: DynamicFormDictionary, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template[this.key];
  }
}
