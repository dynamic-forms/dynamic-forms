import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormField } from '../dynamic-form-field';

@Component({
  selector: 'dynamic-form-group',
  templateUrl: './dynamic-form-group.component.html'
})
export class FormGroupComponent {
  @Input() formField: FormField;
  @Output() modelChange = new EventEmitter<any>();
}
