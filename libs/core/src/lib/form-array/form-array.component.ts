import { Component } from '@angular/core';
import { FormFieldBase } from '../form-field/form-field.base';
import { FormArrayField } from './form-array-field';

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
