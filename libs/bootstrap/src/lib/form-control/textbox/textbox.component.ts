import { Component } from '@angular/core';
import { FormControlInputComponent } from '@dynamic-forms/core';
import { TextboxInput } from './textbox-input';

@Component({
  selector: 'bootstrap-textbox',
  templateUrl: './textbox.component.html'
})
export class TextboxComponent extends FormControlInputComponent<TextboxInput> {}
