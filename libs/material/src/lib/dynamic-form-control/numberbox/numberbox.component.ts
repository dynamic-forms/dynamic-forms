import { Component } from '@angular/core';
import { DynamicFormControlInputComponent } from '@dynamic-forms/core';
import { NumberboxInput } from './numberbox-input';

@Component({
  selector: 'mat-dynamic-numberbox',
  templateUrl: './numberbox.component.html'
})
export class NumberboxComponent extends DynamicFormControlInputComponent<NumberboxInput> {}
