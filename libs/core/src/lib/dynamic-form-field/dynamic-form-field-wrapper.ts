import { Input } from '@angular/core';
import { DynamicFormField } from './dynamic-form-field';

export abstract class DynamicFormFieldWrapper<Field extends DynamicFormField = DynamicFormField> {
  @Input() field: Field;

  get id() { return this.field.path; }
  get definition() { return this.field.definition; }
  get control() { return this.field.control; }
  get template() { return this.field.template; }
}
