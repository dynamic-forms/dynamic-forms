import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormGroup } from './dynamic-form-group.model';

@Component({
  selector: 'dynamic-form-group',
  templateUrl: './dynamic-form-group.component.html'
})
export class DynamicFormGroupComponent {
  @Input() template: DynamicFormGroup;
  @Input() control: FormGroup;
  @Input() model: any;
  @Output() modelChange = new EventEmitter<any>();
}
