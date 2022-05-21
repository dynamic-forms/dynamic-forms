import { UntypedFormGroup } from '@angular/forms';
import {
  DynamicFormFieldAsyncValidator, DynamicFormFieldAsyncValidatorFactory, DynamicFormFieldAsyncValidatorFn,
  DynamicFormFieldValidator, DynamicFormFieldValidatorFactory, DynamicFormFieldValidatorFn
} from '../dynamic-form-field/dynamic-form-field-validator';
import { DynamicFormDictionary } from './dynamic-form-dictionary';

export type DynamicFormDictionaryValidatorFn = DynamicFormFieldValidatorFn<UntypedFormGroup>;

export type DynamicFormDictionaryAsyncValidatorFn = DynamicFormFieldAsyncValidatorFn<UntypedFormGroup>;

export type DynamicFormDictionaryValidatorFactory = DynamicFormFieldValidatorFactory<UntypedFormGroup, DynamicFormDictionary>;

export type DynamicFormDictionaryAsyncValidatorFactory = DynamicFormFieldAsyncValidatorFactory<UntypedFormGroup, DynamicFormDictionary>;

export class DynamicFormDictionaryValidator extends DynamicFormFieldValidator<UntypedFormGroup, DynamicFormDictionary> {
  constructor(factory: DynamicFormDictionaryValidatorFactory, key: string, field: DynamicFormDictionary, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template[this.key];
  }
}

export class DynamicFormDictionaryAsyncValidator extends DynamicFormFieldAsyncValidator<UntypedFormGroup, DynamicFormDictionary> {
  constructor(factory: DynamicFormDictionaryAsyncValidatorFactory, key: string, field: DynamicFormDictionary, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template[this.key];
  }
}
