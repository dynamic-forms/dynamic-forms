import { Component } from '@angular/core';
import { DynamicFormInputComponent } from '@dynamic-forms/core';
import { DynamicFormRadio } from './dynamic-form-radio';

@Component({
  selector: 'mat-dynamic-form-radio',
  templateUrl: './dynamic-form-radio.component.html'
})
export class DynamicFormRadioComponent extends DynamicFormInputComponent<DynamicFormRadio> {}
