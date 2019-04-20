import { Component } from '@angular/core';
import { DynamicFormInputComponent, DynamicFormNumberbox } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-numberbox',
  templateUrl: './dynamic-form-numberbox.component.html'
})
export class DynamicFormNumberboxComponent extends DynamicFormInputComponent<DynamicFormNumberbox> {}
