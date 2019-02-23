import { Input } from '@angular/core';
import { FormField } from './form-field';

export abstract class FormFieldBase<Field extends FormField = FormField> {
  @Input() field: Field;

  get id() { return this.field.path; }
  get template() { return this.field.template; }
  get control() { return this.field.control; }
}
