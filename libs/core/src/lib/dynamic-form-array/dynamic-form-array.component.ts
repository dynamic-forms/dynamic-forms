import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormField } from '../dynamic-form-field';

@Component({
  selector: 'dynamic-form-array',
  templateUrl: './dynamic-form-array.component.html'
})
export class FormArrayComponent {
  @Input() formField: FormField;
  @Output() modelChange = new EventEmitter<any>();
}
