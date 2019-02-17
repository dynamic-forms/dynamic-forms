import { Input } from '@angular/core';
import { FormControlField } from './form-control-field';
import { FormControlInput } from './form-control-input';

export abstract class FormControlInputComponent<FormInput = FormControlInput> {
  @Input() field: FormControlField;

  get id() { return this.field.path; }
  get template() { return this.field.template; }
  get input() { return this.field.template.input; }
  get control() { return this.field.control; }
}
