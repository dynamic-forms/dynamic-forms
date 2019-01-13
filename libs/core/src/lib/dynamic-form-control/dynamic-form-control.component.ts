import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DynamicFormControl } from './dynamic-form-control.model';

@Component({
  selector: 'dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html'
})
export class DynamicFormControlComponent {
  @Input()
  template: DynamicFormControl;
  @Input()
  control: FormControl;
  @Input()
  model: any;
  @Output()
  modelChange = new EventEmitter<any>();
}
