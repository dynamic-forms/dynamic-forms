import { Component } from '@angular/core';
import { FormControlInputComponent } from '@dynamic-forms/core';
import { NumberboxInput } from './numberbox-input';

@Component({
  selector: 'material-textbox',
  templateUrl: './numberbox.component.html'
})
export class NumberboxComponent extends FormControlInputComponent<NumberboxInput> {}
