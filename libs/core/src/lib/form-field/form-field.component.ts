import { Input } from '@angular/core';
import { FormField } from './form-field.model';

export abstract class FormFieldComponent<Field extends FormField> {
  @Input() formField: Field;

  get id(): string {
    return this.formField.path;
  }

  get template() {
    return this.formField.template;
  }

  get control() {
    return this.formField.control;
  }
}
