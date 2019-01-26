import { Component } from '@angular/core';
import { FormArrayField } from './form-array.model';
import { FormField } from '../form-field/form-field.model';
import { FormFieldComponent } from '../form-field/form-field.component';

@Component({
  selector: 'dynamic-form-array',
  templateUrl: './form-array.component.html'
})
export class FormArrayComponent extends FormFieldComponent<FormArrayField> {
  constructor() {
    super();
  }

  get fields(): FormField[] {
    return this.formField.fields;
  }
}
