import { ViewContainerRef } from '@angular/core';
import { FormField } from '../form-field/form-field';

export abstract class FormFieldWrapper<Field extends FormField = FormField> {
  fieldComponent: ViewContainerRef;
  field: Field;

  get id() { return this.field.path; }
  get template() { return this.field.template; }
  get control() { return this.field.control; }
}
