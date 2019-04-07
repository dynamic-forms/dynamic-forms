import { Component } from '@angular/core';
import { DynamicFormInputComponent } from '@dynamic-forms/core';
import { TextboxInput } from './textbox-input';

@Component({
  selector: 'mat-dynamic-textbox',
  templateUrl: './textbox.component.html'
})
export class TextboxComponent extends DynamicFormInputComponent<TextboxInput> {}
