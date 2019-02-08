import { Component } from '@angular/core';
import { FormFieldBase } from '../form-field';
import { FormArrayField } from './models/form-array-field';

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
