import { Input } from '@angular/core';
import { DynamicFormField } from './dynamic-form-field';

export abstract class DynamicFormFieldWrapper<Field extends DynamicFormField = DynamicFormField> {
  @Input() field: Field;

  get id() { return this.field.path; }
  get template() { return this.field.template; }
  get control() { return this.field.control; }
}
