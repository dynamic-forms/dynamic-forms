import { UntypedFormControl } from '@angular/forms';
import {
  DynamicFormFieldAsyncValidator, DynamicFormFieldAsyncValidatorFactory, DynamicFormFieldAsyncValidatorFn,
  DynamicFormFieldValidator, DynamicFormFieldValidatorFactory, DynamicFormFieldValidatorFn
} from '../dynamic-form-field/dynamic-form-field-validator';
import { DynamicFormControl } from './dynamic-form-control';

export type DynamicFormControlValidatorFn = DynamicFormFieldValidatorFn<UntypedFormControl>;

export type DynamicFormControlAsyncValidatorFn = DynamicFormFieldAsyncValidatorFn<UntypedFormControl>;

export type DynamicFormControlValidatorFactory = DynamicFormFieldValidatorFactory<UntypedFormControl, DynamicFormControl>;

export type DynamicFormControlAsyncValidatorFactory = DynamicFormFieldAsyncValidatorFactory<UntypedFormControl, DynamicFormControl>;

export class DynamicFormControlValidator extends DynamicFormFieldValidator<UntypedFormControl, DynamicFormControl> {
  constructor(factory: DynamicFormControlValidatorFactory, key: string, field: DynamicFormControl, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template.input[this.key];
  }
}

export class DynamicFormControlAsyncValidator extends DynamicFormFieldAsyncValidator<UntypedFormControl, DynamicFormControl> {
  constructor(factory: DynamicFormControlAsyncValidatorFactory, key: string, field: DynamicFormControl, deps?: any[]) {
    super(factory, key, field, deps);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template.input[this.key];
  }
}
