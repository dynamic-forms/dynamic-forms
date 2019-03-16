import { Component } from '@angular/core';
import { DynamicFormInputComponent } from '@dynamic-forms/core';
import { RadioButtonInput } from './radio-button-input';

@Component({
  selector: 'bs-dynamic-radio-button',
  templateUrl: './radio-button.component.html'
})
export class RadioButtonComponent extends DynamicFormInputComponent<RadioButtonInput> {}
