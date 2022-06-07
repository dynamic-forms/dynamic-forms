import { FormRecord } from '@angular/forms';
import {
  DynamicFormFieldAsyncValidator, DynamicFormFieldAsyncValidatorFactory, DynamicFormFieldAsyncValidatorFn,
  DynamicFormFieldValidator, DynamicFormFieldValidatorFactory, DynamicFormFieldValidatorFn,
} from '../dynamic-form-field/dynamic-form-field-validator';
import { DynamicFormDictionary } from './dynamic-form-dictionary';

export type DynamicFormDictionaryValidatorFn = DynamicFormFieldValidatorFn<any, FormRecord>;

export type DynamicFormDictionaryAsyncValidatorFn = DynamicFormFieldAsyncValidatorFn<any, FormRecord>;

export type DynamicFormDictionaryValidatorFactory = DynamicFormFieldValidatorFactory<any, FormRecord, DynamicFormDictionary>;

export type DynamicFormDictionaryAsyncValidatorFactory = DynamicFormFieldAsyncValidatorFactory<any, FormRecord, DynamicFormDictionary>;

export class DynamicFormDictionaryValidator extends DynamicFormFieldValidator<any, FormRecord, DynamicFormDictionary> {
  constructor(factory: DynamicFormDictionaryValidatorFactory, key: string, field: DynamicFormDictionary, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template[this.key];
  }
}

export class DynamicFormDictionaryAsyncValidator extends DynamicFormFieldAsyncValidator<any, FormRecord, DynamicFormDictionary> {
  constructor(factory: DynamicFormDictionaryAsyncValidatorFactory, key: string, field: DynamicFormDictionary, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template[this.key];
  }
}
