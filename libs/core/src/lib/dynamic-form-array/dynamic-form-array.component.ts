import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray } from '@angular/forms';
import { DynamicFormArray } from './dynamic-form-array.model';

@Component({
  selector: 'dynamic-form-array',
  templateUrl: './dynamic-form-array.component.html'
})
export class DynamicFormArrayComponent {
  @Input() template: DynamicFormArray;
  @Input() control: FormArray;
  @Input() model: any;
  @Output() modelChange = new EventEmitter<any>();
}
