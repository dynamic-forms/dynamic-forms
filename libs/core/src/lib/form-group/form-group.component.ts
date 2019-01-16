import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormField } from '../form-field/form-field.model';
import { FormGroupTemplate, FormGroupField } from './form-group.model';

@Component({
  selector: 'dynamic-form-group',
  templateUrl: './form-group.component.html'
})
export class FormGroupComponent {
  @Input() formField: FormGroupField;
  @Output() modelChange = new EventEmitter<any>();

  get template(): FormGroupTemplate {
    return this.formField.template;
  }

  get fields(): FormField[] {
    return this.formField.fields;
  }
}
