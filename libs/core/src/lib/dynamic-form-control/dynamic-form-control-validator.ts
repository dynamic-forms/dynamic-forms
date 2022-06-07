import { FormControl } from '@angular/forms';
import {
  DynamicFormFieldAsyncValidator, DynamicFormFieldAsyncValidatorFactory, DynamicFormFieldAsyncValidatorFn,
  DynamicFormFieldValidator, DynamicFormFieldValidatorFactory, DynamicFormFieldValidatorFn,
} from '../dynamic-form-field/dynamic-form-field-validator';
import { DynamicFormControl } from './dynamic-form-control';

export type DynamicFormControlValidatorFn = DynamicFormFieldValidatorFn<any, FormControl>;

export type DynamicFormControlAsyncValidatorFn = DynamicFormFieldAsyncValidatorFn<any, FormControl>;

export type DynamicFormControlValidatorFactory = DynamicFormFieldValidatorFactory<any, FormControl, DynamicFormControl>;

export type DynamicFormControlAsyncValidatorFactory = DynamicFormFieldAsyncValidatorFactory<any, FormControl, DynamicFormControl>;

export class DynamicFormControlValidator extends DynamicFormFieldValidator<any, FormControl, DynamicFormControl> {
  constructor(factory: DynamicFormControlValidatorFactory, key: string, field: DynamicFormControl, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template.input[this.key];
  }
}

export class DynamicFormControlAsyncValidator extends DynamicFormFieldAsyncValidator<any, FormControl, DynamicFormControl> {
  constructor(factory: DynamicFormControlAsyncValidatorFactory, key: string, field: DynamicFormControl, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template.input[this.key];
  }
}
