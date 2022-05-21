import { UntypedFormGroup } from '@angular/forms';
import {
  DynamicFormFieldAsyncValidator, DynamicFormFieldAsyncValidatorFactory, DynamicFormFieldAsyncValidatorFn,
  DynamicFormFieldValidator, DynamicFormFieldValidatorFactory, DynamicFormFieldValidatorFn
} from '../dynamic-form-field/dynamic-form-field-validator';
import { DynamicFormGroup } from './dynamic-form-group';

export type DynamicFormGroupValidatorFn = DynamicFormFieldValidatorFn<UntypedFormGroup>;

export type DynamicFormGroupAsyncValidatorFn = DynamicFormFieldAsyncValidatorFn<UntypedFormGroup>;

export type DynamicFormGroupValidatorFactory = DynamicFormFieldValidatorFactory<UntypedFormGroup, DynamicFormGroup>;

export type DynamicFormGroupAsyncValidatorFactory = DynamicFormFieldAsyncValidatorFactory<UntypedFormGroup, DynamicFormGroup>;

export class DynamicFormGroupValidator extends DynamicFormFieldValidator<UntypedFormGroup, DynamicFormGroup> {
  constructor(factory: DynamicFormGroupValidatorFactory, key: string, field: DynamicFormGroup, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template[this.key];
  }
}

export class DynamicFormGroupAsyncValidator extends DynamicFormFieldAsyncValidator<UntypedFormGroup, DynamicFormGroup> {
  constructor(factory: DynamicFormGroupAsyncValidatorFactory, key: string, field: DynamicFormGroup, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template[this.key];
  }
}
