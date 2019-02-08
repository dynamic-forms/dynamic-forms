import { Input } from '@angular/core';
import { FormField } from './models/form-field';

export abstract class FormFieldBase<Field extends FormField = FormField> {
  @Input() formField: Field;

  get id(): string { return this.formField.path; }
  get template() { return this.formField.template; }
  get control() { return this.formField.control; }
}
