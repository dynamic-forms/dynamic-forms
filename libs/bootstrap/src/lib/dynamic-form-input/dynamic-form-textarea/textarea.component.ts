import { Component } from '@angular/core';
import { DynamicFormInputComponent } from '@dynamic-forms/core';
import { TextareaInput } from './textarea-input';

@Component({
  selector: 'bs-dynamic-textarea',
  templateUrl: './textarea.component.html'
})
export class TextareaComponent extends DynamicFormInputComponent<TextareaInput> {}
