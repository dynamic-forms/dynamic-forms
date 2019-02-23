import { Component } from '@angular/core';
import { DynamicFormControlInputComponent } from '@dynamic-forms/core';
import { TextboxInput } from './textbox-input';

@Component({
  selector: 'bs-dynamic-textbox',
  templateUrl: './textbox.component.html'
})
export class TextboxComponent extends DynamicFormControlInputComponent<TextboxInput> {}
