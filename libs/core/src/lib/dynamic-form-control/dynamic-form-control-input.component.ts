import { Input } from '@angular/core';
import { DynamicFormControl } from './dynamic-form-control';
import { DynamicFormControlInput } from './dynamic-form-control-input';

export abstract class DynamicFormControlInputComponent<
  FormInput extends DynamicFormControlInput = DynamicFormControlInput
> {
  @Input() field: DynamicFormControl<FormInput>;

  get id() { return this.field.path; }
  get template() { return this.field.template; }
  get input() { return this.field.template.input; }
  get control() { return this.field.control; }
}
