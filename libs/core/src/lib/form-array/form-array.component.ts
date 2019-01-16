import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArrayField } from './form-array.model';

@Component({
  selector: 'dynamic-form-array',
  templateUrl: './form-array.component.html'
})
export class FormArrayComponent {
  @Input() formField: FormArrayField;
  @Output() modelChange = new EventEmitter<any>();
}
