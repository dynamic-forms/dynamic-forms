import { FormGroup } from '@angular/forms';
import {
  DynamicFormFieldAsyncValidator, DynamicFormFieldAsyncValidatorFactory, DynamicFormFieldAsyncValidatorFn,
  DynamicFormFieldValidator, DynamicFormFieldValidatorFactory, DynamicFormFieldValidatorFn
} from '../dynamic-form-field/dynamic-form-field-validator';
import { DynamicFormGroup } from './dynamic-form-group';

export type DynamicFormGroupValidatorFn = DynamicFormFieldValidatorFn<FormGroup>;

export type DynamicFormGroupAsyncValidatorFn = DynamicFormFieldAsyncValidatorFn<FormGroup>;

export type DynamicFormGroupValidatorFactory = DynamicFormFieldValidatorFactory<FormGroup, DynamicFormGroup>;

export type DynamicFormGroupAsyncValidatorFactory = DynamicFormFieldAsyncValidatorFactory<FormGroup, DynamicFormGroup>;

export class DynamicFormGroupValidator extends DynamicFormFieldValidator<FormGroup, DynamicFormGroup> {
  constructor(factory: DynamicFormGroupValidatorFactory, key: string, field: DynamicFormGroup, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template[this.key];
  }
}

export class DynamicFormGroupAsyncValidator extends DynamicFormFieldAsyncValidator<FormGroup, DynamicFormGroup> {
  constructor(factory: DynamicFormGroupAsyncValidatorFactory, key: string, field: DynamicFormGroup, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template[this.key];
  }
}
