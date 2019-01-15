import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormField } from '../form-field';
import { FormGroupTemplate } from './form-group.model';

@Component({
  selector: 'dynamic-form-group',
  templateUrl: './form-group.component.html'
})
export class FormGroupComponent {
  @Input() formField: FormField;
  @Output() modelChange = new EventEmitter<any>();

  get template(): FormGroupTemplate {
    return <FormGroupTemplate>this.formField.template;
  }

  get fields(): FormField[] {
    return this.formField.fields;
  }
}
