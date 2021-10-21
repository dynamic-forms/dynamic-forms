import { FormGroup } from '@angular/forms';
import {
  DynamicFormFieldValidator, DynamicFormFieldValidatorFactory, DynamicFormFieldValidatorFn
} from '../dynamic-form-field/dynamic-form-field-validator';
import { DynamicFormDictionary } from './dynamic-form-dictionary';

export type DynamicFormDictionaryValidatorFn = DynamicFormFieldValidatorFn<FormGroup>;

export type DynamicFormDictionaryValidatorFactory = DynamicFormFieldValidatorFactory<FormGroup, DynamicFormDictionary>;

export class DynamicFormDictionaryValidator extends DynamicFormFieldValidator<FormGroup, DynamicFormDictionary> {
  constructor(key: string, field: DynamicFormDictionary, factory: DynamicFormDictionaryValidatorFactory) {
    super(key, field, factory);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template[this.key];
  }
}
