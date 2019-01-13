import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DynamicFormField } from '../dynamic-form-item';

@Component({
  selector: 'dynamic-form-array',
  templateUrl: './dynamic-form-array.component.html'
})
export class DynamicFormArrayComponent {
  @Input() formField: DynamicFormField;
  @Output() modelChange = new EventEmitter<any>();
}
