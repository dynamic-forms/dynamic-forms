import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormField } from '../dynamic-form-field';

@Component({
  selector: 'dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html'
})
export class FormControlComponent {
  @Input() formField: FormField;
  @Output() modelChange = new EventEmitter<any>();
}
