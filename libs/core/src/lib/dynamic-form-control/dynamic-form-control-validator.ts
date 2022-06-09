import { FormControlBase } from '../dynamic-form-field/dynamic-form-field-control';
import {
  DynamicFormFieldAsyncValidator, DynamicFormFieldAsyncValidatorFactory, DynamicFormFieldAsyncValidatorFn,
  DynamicFormFieldValidator, DynamicFormFieldValidatorFactory, DynamicFormFieldValidatorFn,
} from '../dynamic-form-field/dynamic-form-field-validator';
import { DynamicFormControl } from './dynamic-form-control';

export type DynamicFormControlValidatorFn<TValue = any> =
  DynamicFormFieldValidatorFn<TValue, FormControlBase<TValue>>;

export type DynamicFormControlAsyncValidatorFn<TValue = any> =
  DynamicFormFieldAsyncValidatorFn<TValue, FormControlBase<TValue>>;

export type DynamicFormControlValidatorFactory<TValue = any> =
  DynamicFormFieldValidatorFactory<TValue, TValue, FormControlBase<TValue>, DynamicFormControl<TValue>>;

export type DynamicFormControlAsyncValidatorFactory<TValue = any> =
  DynamicFormFieldAsyncValidatorFactory<TValue, TValue, FormControlBase<TValue>, DynamicFormControl<TValue>>;

export class DynamicFormControlValidator<TValue = any>
  extends DynamicFormFieldValidator<TValue, TValue, FormControlBase<TValue>, DynamicFormControl<TValue>> {

  constructor(factory: DynamicFormControlValidatorFactory, key: string, field: DynamicFormControl, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template.input[this.key];
  }
}

export class DynamicFormControlAsyncValidator<TValue = any>
  extends DynamicFormFieldAsyncValidator<TValue, TValue, FormControlBase<TValue>, DynamicFormControl<TValue>> {

  constructor(factory: DynamicFormControlAsyncValidatorFactory, key: string, field: DynamicFormControl, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template.input[this.key];
  }
}
