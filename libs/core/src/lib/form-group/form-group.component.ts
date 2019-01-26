import { Component } from '@angular/core';
import { FormField } from '../form-field/form-field.model';
import { FormFieldComponent } from '../form-field/form-field.component';
import { FormGroupField } from './form-group.model';

@Component({
  selector: 'dynamic-form-group',
  templateUrl: './form-group.component.html'
})
export class FormGroupComponent extends FormFieldComponent<FormGroupField> {
  constructor() {
    super();
  }

  get fields() { return this.formField.fields; }
}
