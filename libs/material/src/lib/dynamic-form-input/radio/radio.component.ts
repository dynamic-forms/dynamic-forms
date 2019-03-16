import { Component } from '@angular/core';
import { DynamicFormInputComponent } from '@dynamic-forms/core';
import { RadioInput } from './radio-input';

@Component({
  selector: 'mat-dynamic-radio',
  templateUrl: './radio.component.html'
})
export class RadioComponent extends DynamicFormInputComponent<RadioInput> {}
