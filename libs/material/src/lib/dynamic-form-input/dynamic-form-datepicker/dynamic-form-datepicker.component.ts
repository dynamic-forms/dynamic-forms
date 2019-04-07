import { Component } from '@angular/core';
import { DynamicFormInputComponent } from '@dynamic-forms/core';
import { DynamicFormDatepicker } from './dynamic-form-datepicker';

@Component({
  selector: 'mat-dynamic-form-datepicker',
  templateUrl: './dynamic-form-datepicker.component.html'
})
export class DynamicFormDatepickerComponent extends DynamicFormInputComponent<DynamicFormDatepicker> {}
