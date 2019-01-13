import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DynamicFormField } from '../dynamic-form-item';

@Component({
  selector: 'dynamic-form-group',
  templateUrl: './dynamic-form-group.component.html'
})
export class DynamicFormGroupComponent {
  @Input() formField: DynamicFormField;
  @Output() modelChange = new EventEmitter<any>();
}
