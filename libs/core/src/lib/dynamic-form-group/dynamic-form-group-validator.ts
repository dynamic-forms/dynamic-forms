import { FormGroup } from '@angular/forms';
import {
  DynamicFormFieldAsyncValidator, DynamicFormFieldAsyncValidatorFactory, DynamicFormFieldAsyncValidatorFn,
  DynamicFormFieldValidator, DynamicFormFieldValidatorFactory, DynamicFormFieldValidatorFn,
} from '../dynamic-form-field/dynamic-form-field-validator';
import { DynamicFormGroup } from './dynamic-form-group';

export type DynamicFormGroupValidatorFn = DynamicFormFieldValidatorFn<any, FormGroup>;

export type DynamicFormGroupAsyncValidatorFn = DynamicFormFieldAsyncValidatorFn<any, FormGroup>;

export type DynamicFormGroupValidatorFactory = DynamicFormFieldValidatorFactory<any, FormGroup, DynamicFormGroup>;

export type DynamicFormGroupAsyncValidatorFactory = DynamicFormFieldAsyncValidatorFactory<any, FormGroup, DynamicFormGroup>;

export class DynamicFormGroupValidator extends DynamicFormFieldValidator<any, FormGroup, DynamicFormGroup> {
  constructor(factory: DynamicFormGroupValidatorFactory, key: string, field: DynamicFormGroup, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template[this.key];
  }
}

export class DynamicFormGroupAsyncValidator extends DynamicFormFieldAsyncValidator<any, FormGroup, DynamicFormGroup> {
  constructor(factory: DynamicFormGroupAsyncValidatorFactory, key: string, field: DynamicFormGroup, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template[this.key];
  }
}
