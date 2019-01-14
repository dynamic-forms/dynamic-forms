import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormField } from '../form-field';

@Component({
  selector: 'dynamic-form-group',
  templateUrl: './form-group.component.html'
})
export class FormGroupComponent {
  @Input() formField: FormField;
  @Output() modelChange = new EventEmitter<any>();
}
