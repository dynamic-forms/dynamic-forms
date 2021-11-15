import { FormGroup } from '@angular/forms';
import {
  DynamicFormFieldAsyncValidator, DynamicFormFieldAsyncValidatorFactory, DynamicFormFieldAsyncValidatorFn,
  DynamicFormFieldValidator, DynamicFormFieldValidatorFactory, DynamicFormFieldValidatorFn
} from '../dynamic-form-field/dynamic-form-field-validator';
import { DynamicFormDictionary } from './dynamic-form-dictionary';

export type DynamicFormDictionaryValidatorFn = DynamicFormFieldValidatorFn<FormGroup>;

export type DynamicFormDictionaryAsyncValidatorFn = DynamicFormFieldAsyncValidatorFn<FormGroup>;

export type DynamicFormDictionaryValidatorFactory = DynamicFormFieldValidatorFactory<FormGroup, DynamicFormDictionary>;

export type DynamicFormDictionaryAsyncValidatorFactory = DynamicFormFieldAsyncValidatorFactory<FormGroup, DynamicFormDictionary>;

export class DynamicFormDictionaryValidator extends DynamicFormFieldValidator<FormGroup, DynamicFormDictionary> {
  constructor(factory: DynamicFormDictionaryValidatorFactory, key: string, field: DynamicFormDictionary, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template[this.key];
  }
}

export class DynamicFormDictionaryAsyncValidator extends DynamicFormFieldAsyncValidator<FormGroup, DynamicFormDictionary> {
  constructor(factory: DynamicFormDictionaryAsyncValidatorFactory, key: string, field: DynamicFormDictionary, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template[this.key];
  }
}
