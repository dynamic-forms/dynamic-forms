import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DynamicFormField } from '../dynamic-form-item';

@Component({
  selector: 'dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html'
})
export class DynamicFormControlComponent {
  @Input() formField: DynamicFormField;
  @Output() modelChange = new EventEmitter<any>();
}
