import { Component } from '@angular/core';
import { FormFieldBase } from '../form-field';
import { FormGroupField } from './models/form-group-field';

@Component({
  selector: 'dynamic-form-group',
  templateUrl: './form-group.component.html'
})
export class FormGroupComponent extends FormFieldBase<FormGroupField> {
  constructor() {
    super();
  }

  get fields() { return this.formField.fields; }
}
