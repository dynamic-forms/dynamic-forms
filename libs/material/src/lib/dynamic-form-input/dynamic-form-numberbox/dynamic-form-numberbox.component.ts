import { Component } from '@angular/core';
import { DynamicFormInputComponent } from '@dynamic-forms/core';
import { DynamicFormNumberbox } from './dynamic-form-numberbox';

@Component({
  selector: 'mat-dynamic-form-numberbox',
  templateUrl: './dynamic-form-numberbox.component.html'
})
export class DynamicFormNumberboxComponent extends DynamicFormInputComponent<DynamicFormNumberbox> {}
