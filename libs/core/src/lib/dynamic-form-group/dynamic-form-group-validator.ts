import { FormGroup } from '@angular/forms';
import { DynamicFormFieldValidator, DynamicFormFieldValidatorFactory, DynamicFormFieldValidatorFn } from '../dynamic-form-field/dynamic-form-field-validator';
import { DynamicFormGroup } from './dynamic-form-group';

export type DynamicFormGroupValidatorFn = DynamicFormFieldValidatorFn<FormGroup>;

export type DynamicFormGroupValidatorFactory = DynamicFormFieldValidatorFactory<FormGroup, DynamicFormGroup>;

export class DynamicFormGroupValidator extends DynamicFormFieldValidator<FormGroup, DynamicFormGroup> {
  constructor(key: string, field: DynamicFormGroup, factory: DynamicFormGroupValidatorFactory) {
    super(key, field, factory);
  }

  protected getParameters(): any {
    return this.definition ? this.definition.parameters : this.field.template[this.key];
  }
}
