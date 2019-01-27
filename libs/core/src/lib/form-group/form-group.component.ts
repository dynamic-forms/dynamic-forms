import { Component } from '@angular/core';
import { FormFieldBase } from '../form-field/form-field.model';
import { FormGroupField } from './form-group.model';

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
