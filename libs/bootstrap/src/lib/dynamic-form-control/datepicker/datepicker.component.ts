import { Component } from '@angular/core';
import { DynamicFormControlInputComponent } from '@dynamic-forms/core';
import { DatepickerInput } from './datepicker-input';

@Component({
  selector: 'bs-dynamic-datepicker',
  templateUrl: './datepicker.component.html'
})
export class DatepickerComponent extends DynamicFormControlInputComponent<DatepickerInput> {}
