import { Component } from '@angular/core';
import { DynamicFormInputComponent, DynamicFormRadio } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-radio',
  templateUrl: './dynamic-form-radio.component.html'
})
export class DynamicFormRadioComponent extends DynamicFormInputComponent<DynamicFormRadio> {}
