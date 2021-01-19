import { FormArray } from '@angular/forms';
import { DynamicFormFieldValidator, DynamicFormFieldValidatorFactory, DynamicFormFieldValidatorFn } from '../dynamic-form-field/dynamic-form-field-validator';
import { DynamicFormArray } from './dynamic-form-array';

export type DynamicFormArrayValidatorFn = DynamicFormFieldValidatorFn<FormArray>;

export type DynamicFormArrayValidatorFactory = DynamicFormFieldValidatorFactory<FormArray, DynamicFormArray>;

export class DynamicFormArrayValidator extends DynamicFormFieldValidator<FormArray, DynamicFormArray> {

  constructor(key: string, field: DynamicFormArray, factory: DynamicFormArrayValidatorFactory) {
    super(key, field, factory);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template[this.key];
  }
}
