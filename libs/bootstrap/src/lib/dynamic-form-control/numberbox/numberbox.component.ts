import { Component } from '@angular/core';
import { DynamicFormControlInputComponent } from '@dynamic-forms/core';
import { NumberboxInput } from './numberbox-input';

@Component({
  selector: 'bs-dynamic-numberbox',
  templateUrl: './numberbox.component.html'
})
export class NumberboxComponent extends DynamicFormControlInputComponent<NumberboxInput> {}
