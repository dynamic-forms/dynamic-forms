import { Input } from '@angular/core';
import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormInput } from './dynamic-form-input';

export abstract class DynamicFormInputComponent<FormInput extends DynamicFormInput = DynamicFormInput> {
  @Input() field: DynamicFormControl<FormInput>;

  get id() { return this.field.path; }
  get template() { return this.field.template; }
  get input() { return this.field.template.input; }
  get control() { return this.field.control; }
}
