import { Component } from '@angular/core';
import { FormArrayField } from './models/form-array.field';
import { FormFieldBase } from '../form-field/form-field.model';

@Component({
  selector: 'dynamic-form-array',
  templateUrl: './form-array.component.html'
})
export class FormArrayComponent extends FormFieldBase<FormArrayField> {
  constructor() {
    super();
  }

  get fields() { return this.formField.fields; }
}
