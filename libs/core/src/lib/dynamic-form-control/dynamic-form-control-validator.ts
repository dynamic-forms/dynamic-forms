import { FormControlBase } from '../dynamic-form-field/dynamic-form-field-control';
import {
  DynamicFormFieldAsyncValidator,
  DynamicFormFieldAsyncValidatorFactory,
  DynamicFormFieldAsyncValidatorFn,
  DynamicFormFieldValidator,
  DynamicFormFieldValidatorFactory,
  DynamicFormFieldValidatorFn,
} from '../dynamic-form-field/dynamic-form-field-validator';
import { DynamicFormControl } from './dynamic-form-control';

export type DynamicFormControlValidatorFn<Value = any> = DynamicFormFieldValidatorFn<Value, FormControlBase<Value>>;

export type DynamicFormControlAsyncValidatorFn<Value = any> = DynamicFormFieldAsyncValidatorFn<Value, FormControlBase<Value>>;

export type DynamicFormControlValidatorFactory<Value = any> = DynamicFormFieldValidatorFactory<
  Value,
  Value,
  FormControlBase<Value>,
  DynamicFormControl<Value>
>;

export type DynamicFormControlAsyncValidatorFactory<Value = any> = DynamicFormFieldAsyncValidatorFactory<
  Value,
  Value,
  FormControlBase<Value>,
  DynamicFormControl<Value>
>;

export class DynamicFormControlValidator<Value = any> extends DynamicFormFieldValidator<
  Value,
  Value,
  FormControlBase<Value>,
  DynamicFormControl<Value>
> {
  constructor(factory: DynamicFormControlValidatorFactory, key: string, field: DynamicFormControl, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template.input[this.key];
  }
}

export class DynamicFormControlAsyncValidator<Value = any> extends DynamicFormFieldAsyncValidator<
  Value,
  Value,
  FormControlBase<Value>,
  DynamicFormControl<Value>
> {
  constructor(factory: DynamicFormControlAsyncValidatorFactory, key: string, field: DynamicFormControl, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template.input[this.key];
  }
}
