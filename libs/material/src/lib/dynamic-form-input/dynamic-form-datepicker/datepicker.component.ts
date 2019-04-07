import { Component } from '@angular/core';
import { DynamicFormInputComponent } from '@dynamic-forms/core';
import { DatepickerInput } from './datepicker-input';

@Component({
  selector: 'mat-dynamic-datepicker',
  templateUrl: './datepicker.component.html'
})
export class DatepickerComponent extends DynamicFormInputComponent<DatepickerInput> {}
