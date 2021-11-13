import { FormControl } from '@angular/forms';
import {
  DynamicFormFieldAsyncValidator, DynamicFormFieldAsyncValidatorFactory, DynamicFormFieldAsyncValidatorFn,
  DynamicFormFieldValidator, DynamicFormFieldValidatorFactory, DynamicFormFieldValidatorFn
} from '../dynamic-form-field/dynamic-form-field-validator';
import { DynamicFormControl } from './dynamic-form-control';

export type DynamicFormControlValidatorFn = DynamicFormFieldValidatorFn<FormControl>;

export type DynamicFormControlValidatorAsyncFn = DynamicFormFieldAsyncValidatorFn<FormControl>;

export type DynamicFormControlValidatorFactory = DynamicFormFieldValidatorFactory<FormControl, DynamicFormControl>;

export type DynamicFormControlAsyncValidatorFactory = DynamicFormFieldAsyncValidatorFactory<FormControl, DynamicFormControl>;

export class DynamicFormControlValidator extends DynamicFormFieldValidator<FormControl, DynamicFormControl> {
  constructor(key: string, field: DynamicFormControl, factory: DynamicFormControlValidatorFactory) {
    super(key, field, factory);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template.input[this.key];
  }
}

export class DynamicFormControlAsyncValidator extends DynamicFormFieldAsyncValidator<FormControl, DynamicFormControl> {
  constructor(key: string, field: DynamicFormControl, factory: DynamicFormControlAsyncValidatorFactory) {
    super(key, field, factory);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template.input[this.key];
  }
}
